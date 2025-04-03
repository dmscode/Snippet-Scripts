/**
 * Markdown 渲染器类，用于将 Markdown 文本转换为带有表情符号装饰的格式
 */
class markdownRender {
    content: string
    // 定义处理器数组，包含标题、无序列表和有序列表的处理方法
    handlers: any[] = [
        this.titleHandler.bind(this),
        this.codeBlockHandler.bind(this),
        this.blockquoteHandler.bind(this),
        this.hrHandler.bind(this),
        this.unorderedListHandler.bind(this),
        this.orderedListHandler.bind(this),
        this.spanTextHandler.bind(this),
        this.urlHandler.bind(this),
    ]

    constructor(content: string) {
        this.content = content
    }

    /**
     * 渲染方法，依次执行所有处理器
     */
    render() {
        return this.handlers.reduce((content, handler) => handler(content), this.content)
    }

    /**
     * 标题处理器，将 Markdown 标题转换为带表情符号的格式
     */
    private titleHandler(content:string) {
        return content.replace(/^(#+)\s(.*)/gm, (match, level, title) => {
            // 清理标题文本，移除末尾的 # 符号
            title = title.replace(/\s+#+$/g, '');
            const levelStr = (character: string) => new Array(Math.max(4-level.length, 1)).fill(character).join('')
            // 根据标题级别（1-6）选择对应的表情符号装饰
            const titleMark = levelStr('📌')
            // 使用表情符号包装标题文本
            return `${titleMark}${levelStr('>')} ${title} ${levelStr('<')}${titleMark}\n\n`;
        })
    }

    /**
     * 代码块处理器，将代码块转换为带表情符号的格式
     */
    private codeBlockHandler(content:string) {
        return content.replace(/^`{3,}(\w*)\n+([\s\S]*?)\n`{3,}\n/gm, (match, language, code) => {
            return `💻${language.length ? language+' ' : ''}Code💻
${code}
💻Code End!💻`;
        })
    }

    /**
     * 引用块处理器，将引用块转换为带表情符号的格式
     */
    private blockquoteHandler(content:string) {
        return content.replace(/^>\s(.*)/gm, (match, text) => {
            return `📜➤ ${text}`;
        })
    }

    /**
     * 分隔线处理器，将分隔线转换为带表情符号的格式
    */
    private hrHandler(content:string) {
        return content.replace(/^-{3,}|_{3,}|\*{3,}$/gm, () => {
            return `⭐ ═══════ ⭐ ═══════ ⭐`;
        })
    }
    /**
     * 无序列表处理器，将无序列表项转换为带表情符号的格式
     */
    private unorderedListHandler(content:string) {
        return content.replace(/^([ \t]*)[-+*] (.*)/gm, (match, space, text) => {
            // 根据缩进层级选择表情符号：无缩进使用🔸，有缩进使用🔹
            return `${space}${ space.length? '🔹' : '🔸' } ${text}`;
        })
    }

    /**
     * 有序列表处理器，将数字编号转换为表情符号数字
     */
    private orderedListHandler(content:string) {
        return content.replace(/^([ \t]*)(\d+)\. (.*)/gm, (match, space, index, text) => {
            // 定义数字对应的表情符号映射
            const numMarks = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
            // 将数字转换为对应的表情符号
            const indexMark = index.split('').map((num: string) => numMarks[parseInt(num)]).join('')
            // 组合最终的列表项格式
            return `${space}${indexMark} ${text}`;
        })
    }

    /**
     * 行内文本样式处理器，将 Markdown 行内标记转换为带表情符号的格式
     * @param content 需要处理的文本内容
     * @returns 处理后的文本
     */
    private spanTextHandler(content:string) {
        return content
            // 将双星号或双下划线包裹的文本转换为【】包裹
            .replace(/\*\*(.+?)\*\*/g, '【$1】')
            .replace(/__(.+?)__/g, '【$1】')
            // 将单星号或单下划线包裹的文本转换为『』包裹
            .replace(/\*(.+?)\*/g, '『$1』')
            .replace(/_(.+?)_/g, '『$1』')
            // 将双波浪线包裹的文本转换为❌符号包裹
            .replace(/~~(.+?)~~/g, '❌$1❌')
            // 将双等号包裹的文本转换为💡符号包裹
            .replace(/==(.+?)==/g, '💡$1💡')
            // 将反引号包裹的文本转换为💻符号包裹
            .replace(/`+(.+?)`+/g, '💻$1💻')
    }
    /**
     * 链接处理器，将 Markdown 链接转换为带表情符号的格式
     * @param content 需要处理的文本内容
     * @returns 处理后的文本
     */
    private urlHandler(content:string) {
        return content
            // 处理行内链接 [文本](URL)
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '🔗【$1】( $2 )')
            // 处理引用链接 [文本][引用]
            .replace(/\[([^\]]+)\]\[\^?([^\]]+)\]/g, '🔗【$1】[📍$2]')
    }
}

/**
 * 将输入的 Markdown 文本转换为带有表情符号装饰的格式
 * @param input - 输入的 Markdown 文本
 * @returns 转换后的带表情符号的文本，如果输入为空则返回空字符串
 */
export const EmojiMarkdown = (input: string) => {
    // 检查输入是否为空
    if (!input)  return '';
    // 创建渲染器实例并执行渲染
    return new markdownRender(input).render()
}