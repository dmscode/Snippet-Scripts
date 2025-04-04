// 使用 require 导入 package.json
const pkg = require('../package.json');
import { RemoveZeroWidthChars } from "./actions/RemoveZeroWidthChars";
import { CorrectCase } from "./actions/CorrectCase";
import { EmojiMarkdown } from "./actions/EmojiMarkdown";
import { WhiteSpace } from "./actions/WhiteSpace";
import { FormatExpression } from "./actions/FormatExpression";

/**
 * 文本片段处理类
 * 提供单个或链式处理文本片段的功能
 */
export class SnippetActions {
    // 可用的处理方法集合
    actions = {
        RemoveZeroWidthChars: {
            name: '移除零宽字符',
            description: '移除文本中的零宽字符',
            action: RemoveZeroWidthChars,
        },
        CorrectCase: {
            name: '修正特定词汇的大小写',
            description: '修正文本中特定词汇的大小写',
            action: CorrectCase,
        },
        EmojiMarkdown: {
            name: 'Markdown 文本化',
            description: '将 Markdown 转换为用 Emoji 进行标记的纯文本格式',
            action: EmojiMarkdown,
        },
        WhiteSpace: {
            name: '盘古之白',
            description: '在中文和英文/数字之间添加空格',
            action: WhiteSpace,
        },
        FormatExpression: {
            name: '格式化计算式（Use）',
            description: '替换因为输入法为正确切换而产生的异体字符',
            action: FormatExpression,
        },
        FormatExpressionToDisplay: {
            name: '格式化计算式（Display）',
            description: '将运算符等替换为标准的数学符号',
            action: (input) => FormatExpression(input, true),
        },
    }
    workflows = {
        Markdown: {
            name: 'Markdown 文本化',
            description: '将 Markdown 转换为用 Emoji 进行标记的纯文本格式',
            actions: ['RemoveZeroWidthChars', 'WhiteSpace', 'CorrectCase', 'EmojiMarkdown'],
        },
        Format: {
            name: '格式化',
            description: '移除零宽字符、在中文和英文/数字之间添加空格',
            actions: ['RemoveZeroWidthChars', 'WhiteSpace', 'CorrectCase'],
        },
    }
    // 待处理的输入文本
    input: string;
    // 处理选项
    options: any;
    // 版本
    version = pkg.version;

    /**
     * 初始化代码片段处理类
     * @param input 输入文本，为空时默认为空字符串
     */
    constructor(input: string) {
        this.input = input || '';
    }

    /**
     * 执行单个处理方法
     * @param actionName 处理方法名称
     * @returns 处理后的结果
     */
    runAction(actionName: keyof typeof this.actions) {
        // 调用指定的处理方法并返回结果
        return this.actions[actionName].action(this.input);
    }

    /**
     * 执行指定的工作流程
     * @param workflowName 工作流名称
     * @returns 按工作流中定义的动作顺序处理后的结果
     */
    runWorkflow(workflowName: keyof typeof this.workflows) {
        // 获取工作流中定义的动作列表并按顺序执行
        return this.chain(this.workflows[workflowName].actions as (keyof typeof this.actions)[]);
    }

    /**
     * 链式调用多个处理方法
     * @param actions 处理方法数组
     * @returns 处理后的结果
     */
    chain(actions: (keyof typeof this.actions)[]) {
        // 使用reduce依次执行处理方法，将上一步的结果作为下一步的输入
        return actions.reduce((result, actionName) => {
            return this.actions[actionName].action(result);
        }, this.input);
    }

    /**
     * 获取所有可用的动作列表
     * @returns 包含所有可用动作信息的对象
     */
    getActions() {
        return Object.entries(this.actions).reduce((acc, [key, value]) => {
            acc[key] = {
                name: value.name,
                description: value.description
            };
            return acc;
        }, {} as Record<string, { name: string; description: string }>);
    }
    /**
     * 获取所有可用的工作流列表
     * @returns 包含所有可用工作流信息的对象，每个工作流包含 name 和 description 属性
     */
    getWorkflows() {
        // 将工作流对象转换为仅包含 name 和 description 的简化对象
        return Object.entries(this.workflows).reduce((acc, [key, value]) => {
            acc[key] = {
                name: value.name,
                description: value.description
            };
            return acc;
        }, {} as Record<string, { name: string; description: string }>);
    }
}