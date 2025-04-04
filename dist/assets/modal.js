/**
 * 模态窗口类
 * 封装模态窗口的通用操作
 */
class Modal {
    /**
     * @param {string} modalId - 模态窗口的DOM ID
     */
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.eventListeners = new Map();
        
        // 缓存常用DOM元素
        this.title = this.modal.querySelector('#modal-title');
        this.description = this.modal.querySelector('#modal-description');
        this.inputContainer = this.modal.querySelector('#modal-input-container');
        this.resultContainer = this.modal.querySelector('#modal-result-container');
        this.inputTextarea = this.modal.querySelector('#input-text');
        this.resultContent = this.modal.querySelector('#modal-content');
        
        // 初始化关闭按钮事件
        this._setupCloseButton();
    }

    /**
     * 设置关闭按钮的默认行为
     * @private
     */
    _setupCloseButton() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.hide();
            });
        }
    }

    /**
     * 显示模态窗口
     * @param {Object} options - 配置选项
     * @param {string} options.title - 模态窗口标题
     * @param {string} options.description - 模态窗口描述
     * @param {string} options.mode - 模态窗口模式 ('input' | 'result')
     * @param {string} options.content - 当mode为result时，要显示的内容
     */
    show(options = {}) {
        const { title, description, mode, content } = options;
        
        // 设置标题和描述
        if (title) this.title.textContent = title;
        if (description) this.description.textContent = description;
        
        // 根据模式显示不同内容
        this._setMode(mode);
        
        // 如果提供了内容且为结果模式，则设置内容
        if (content && mode === 'result' && this.resultContent) {
            this.resultContent.textContent = content;
        }
        
        // 显示模态窗口
        this.modal.classList.add('show');
        
        // 如果是输入模式，自动聚焦到输入框
        if (mode === 'input' && this.inputTextarea) {
            setTimeout(() => this.inputTextarea.focus(), 100);
        }
        
        return this;
    }

    /**
     * 设置模态窗口的显示模式
     * @param {string} mode - 模式 ('input' | 'result')
     * @private
     */
    _setMode(mode) {
        if (mode === 'input') {
            this.inputContainer.style.display = 'block';
            this.resultContainer.style.display = 'none';
        } else if (mode === 'result') {
            this.inputContainer.style.display = 'none';
            this.resultContainer.style.display = 'block';
        }
    }

    /**
     * 隐藏模态窗口
     * @returns {Modal} 当前实例，支持链式调用
     */
    hide() {
        this.modal.classList.remove('show');
        return this;
    }

    /**
     * 设置模态窗口的内容
     * @param {string} content - 要显示的内容
     * @returns {Modal} 当前实例，支持链式调用
     */
    setContent(content) {
        if (this.resultContent) {
            this.resultContent.textContent = content;
        }
        return this;
    }

    /**
     * 获取输入框的值
     * @returns {string} 输入框的值
     */
    getInputValue() {
        return this.inputTextarea ? this.inputTextarea.value.trim() : '';
    }

    /**
     * 清理模态窗口内容
     * @param {string} elementId - 需要清理内容的元素ID
     * @param {number} delay - 延迟清理的时间（毫秒）
     * @returns {Modal} 当前实例，支持链式调用
     */
    clear(elementId, delay = 0) {
        const element = document.getElementById(elementId);
        if (element) {
            setTimeout(() => {
                if (element.tagName.toLowerCase() === 'textarea' || 
                    element.tagName.toLowerCase() === 'input') {
                    element.value = '';
                } else {
                    element.textContent = '';
                }
            }, delay);
        }
        return this;
    }

    /**
     * 添加事件监听器
     * @param {string} elementId - 元素ID
     * @param {string} event - 事件名称
     * @param {Function} handler - 事件处理函数
     * @param {boolean} once - 是否只触发一次
     * @returns {Modal} 当前实例，支持链式调用
     */
    on(elementId, event, handler, once = false) {
        const element = elementId === 'close' ? this.closeBtn : document.getElementById(elementId);
        if (element) {
            const wrappedHandler = (...args) => {
                handler(...args);
                if (once) {
                    this.off(elementId, event, wrappedHandler);
                }
            };
            element.addEventListener(event, wrappedHandler);
            
            // 存储事件监听器信息以便后续移除
            const key = `${elementId}-${event}`;
            if (!this.eventListeners.has(key)) {
                this.eventListeners.set(key, []);
            }
            this.eventListeners.get(key).push({ handler: wrappedHandler, original: handler });
        }
        return this;
    }

    /**
     * 移除事件监听器
     * @param {string} elementId - 元素ID
     * @param {string} event - 事件名称
     * @param {Function} handler - 原始事件处理函数
     * @returns {Modal} 当前实例，支持链式调用
     */
    off(elementId, event, handler) {
        const element = elementId === 'close' ? this.closeBtn : document.getElementById(elementId);
        const key = `${elementId}-${event}`;
        const listeners = this.eventListeners.get(key);
        
        if (element && listeners) {
            const listener = listeners.find(l => l.original === handler);
            if (listener) {
                element.removeEventListener(event, listener.handler);
                this.eventListeners.set(key, 
                    listeners.filter(l => l.original !== handler)
                );
            }
        }
        return this;
    }

    /**
     * 移除所有事件监听器
     * @returns {Modal} 当前实例，支持链式调用
     */
    removeAllListeners() {
        for (const [key, listeners] of this.eventListeners) {
            const [elementId, event] = key.split('-');
            const element = elementId === 'close' ? this.closeBtn : document.getElementById(elementId);
            
            if (element) {
                listeners.forEach(({ handler }) => {
                    element.removeEventListener(event, handler);
                });
            }
        }
        this.eventListeners.clear();
        return this;
    }
}