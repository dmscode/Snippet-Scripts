/**
 * 移除字符串中的不可见的 Unicode 控制字符
 * 主要用于处理在微信中输入 Markdown 列表时，自动添加的不可见 Unicode 控制字符导致的渲染错误问题。
 * 
 * @param {string} input - 需要处理的输入字符串
 * @returns {string} 移除了零宽字符后的字符串
 */
export function RemoveZeroWidthChars(input: string): string {
    // 如果输入为空，直接返回空字符串
    if (!input) return '';
    // 定义正则表达式匹配所有需要移除的字符：
    // - \u200B-\u200F: 零宽字符范围
    // - \uFEFF: BOM标记
    // - \u061C: 阿拉伯字母格式控制字符
    // - \u2060-\u2069: 不可见的连接符和格式控制字符
    // - \uFFF9-\uFFFB: 内嵌对象控制字符
    const pattern = /[\u200B-\u200F\uFEFF\u061C\u2060-\u2069\uFFF9-\uFFFB]+/g;
    
    // 使用正则替换移除匹配到的字符
    return input.replace(pattern, '');
}