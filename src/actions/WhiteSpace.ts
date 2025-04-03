// 使用正则表达式匹配中文与英文/数字的相邻位置，并在其间添加空格
const replacer = (content:string) => content.replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])|([a-zA-Z0-9])([\u4e00-\u9fa5])/g, '$1$3 $2$4');
/**
 * 在中文和英文/数字之间添加空格
 * @param input 输入的字符串
 * @returns 处理后的字符串
 */
export const WhiteSpace = (input: string) => {
    // 如果输入为空字符串，直接返回空字符串
    if (input === '') return '';
    // 对输入字符串进行两次处理，以覆盖单个文字重叠的情况，如：Obsidian和Notion
    return replacer(replacer(input));
}