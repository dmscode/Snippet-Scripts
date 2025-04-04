const SnippetActions = SA.SnippetActions;

/**
 * 从剪贴板读取文本内容
 * @description 首先尝试从剪贴板读取文本，如果失败则通过模态窗口获取用户输入
 * @returns {Promise<string>} 返回剪贴板内容或用户输入的文本
 */
const readClipboard = async () => {
    let text;
    try {
        // 尝试从系统剪贴板读取文本内容
        text = await navigator.clipboard.readText();
    } catch (err) {}

    // 当剪贴板读取失败或内容为空时，弹出模态窗口让用户手动输入
    if(!text || !text.length) {
        text = await new Promise((resolve) => {
            // 创建模态窗口实例
            const modal = new Modal('common-modal');
            
            // 定义确认按钮的处理函数：获取输入内容并关闭窗口
            const handleConfirm = () => {
                const inputText = modal.getInputValue();
                modal.hide().clear('input-text', 300);
                modal.removeAllListeners();
                resolve(inputText);
            };

            // 定义取消按钮的处理函数：关闭窗口并返回空字符串
            const handleCancel = () => {
                modal.hide().clear('input-text', 300);
                modal.removeAllListeners();
                resolve('');
            };

            // 绑定模态窗口的事件监听器
            modal.on('confirm-input', 'click', handleConfirm);
            modal.on('cancel-input', 'click', handleCancel);
            modal.on('close', 'click', handleCancel);

            // 显示模态窗口
            modal.show({
                title: '输入文本',
                description: '请输入要处理的文本内容',
                mode: 'input'
            });
        });
    }

    // 返回最终获取到的文本内容
    return text || '';
};
/**
 * 创建按钮元素
 * @param {string} text - 按钮文本
 * @param {string} description - 提示文本
 * @returns {HTMLButtonElement} 创建的按钮元素
 */
const createButton = (text, description) => {
    const button = document.createElement('button');
    button.textContent = text;
    // 创建提示元素
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = description || '';
    button.appendChild(tooltip);
    // 设置提示显示/隐藏事件
    setupTooltip(button, tooltip);
    return button;
};

/**
 * 设置按钮的提示显示/隐藏事件
 * @param {HTMLButtonElement} button - 按钮元素
 * @param {HTMLSpanElement} tooltip - 提示元素
 */
const setupTooltip = (button, tooltip) => {
    button.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
    });
    button.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
};

/**
 * 处理操作结果并显示结果模态窗口
 * @param {string} result - 操作结果
 * @returns {Promise<void>}
 */
const handleActionResult = async (result) => {
    // 写回剪贴板
    await navigator.clipboard.writeText(result);
    // 显示结果模态窗口
    const resultModal = new Modal('common-modal');
    resultModal.show({
        title: '处理结果',
        description: '已复制到剪贴板',
        mode: 'result',
        content: result
    });

    resultModal.on('close-modal', 'click', () => resultModal.hide(), true);
};

/**
 * 创建工作流按钮的点击事件处理函数
 * @param {string} flowName - 工作流名称
 * @returns {Function} 点击事件处理函数
 */
const createWorkflowClickHandler = (flowName) => async () => {
    try {
        const text = await readClipboard();
        const snippetActions = new SnippetActions(text);

        // 执行工作流
        const result = snippetActions.runWorkflow(flowName);
        await handleActionResult(result);
    } catch (err) {
        alert('工作流失败：' + err.message); 
    }
};

/**
 * 创建动作按钮的点击事件处理函数
 * @param {string} actionName - 动作名称
 * @returns {Function} 点击事件处理函数
 */
const createActionClickHandler = (actionName) => async () => {
    try {
        const text = await readClipboard();
        const snippetActions = new SnippetActions(text);
        
        // 执行操作
        const result = snippetActions.runAction(actionName);
        await handleActionResult(result);
    } catch (err) {
        alert('操作失败：' + err.message);
    }
};

// 初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const versionContainer = document.getElementById('version');
    const flowsContainer = document.getElementById('flows');
    const actionsContainer = document.getElementById('actions');
    const snippetActions = new SnippetActions('');
    
    // 显示版本号
    versionContainer.textContent = `v${snippetActions.version}`;
    
    // 获取所有可用的工作流
    const flows = snippetActions.getWorkflows();
    
    // 创建工作流按钮
    Object.entries(flows).forEach(([flowName, flowInfo]) => {
        const button = createButton(flowInfo.name || flowName, flowInfo.description || '');
        button.addEventListener('click', createWorkflowClickHandler(flowName));
        flowsContainer.appendChild(button);
    });

    // 获取所有可用的动作
    const actions = snippetActions.getActions();
    
    // 创建动作按钮
    Object.entries(actions).forEach(([actionName, actionInfo]) => {
        const button = createButton(actionInfo.name || actionName, actionInfo.description || '');
        button.addEventListener('click', createActionClickHandler(actionName));
        actionsContainer.appendChild(button);
    });
});

/**
 * 注册 Service Worker
 * @description 在页面加载完成后注册 Service Worker，用于实现离线缓存等功能
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // 注册位于 ./sw.js 的 Service Worker
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                // 注册成功时输出日志
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                // 注册失败时输出错误信息
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}