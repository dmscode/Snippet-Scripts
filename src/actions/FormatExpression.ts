// 定义异体字符映射表
const VariantSymbols = new Map([
    ['（', '('],
    ['）', ')'],
    ['【', '['],
    ['】', ']'],
    ['《', '<'],
    ['》', '>'],
    ['｛', '{'],
    ['｝', '}'],
    ['％', '%'],
    ['＋', '+'],
    ['－', '-'],
    ['＊', '*'],
    ['／', '/'],
    ['＝', '='],
    ['＜', '<'],
    ['＞', '>'],
    ['～', '~'],
    ['！', '!'],
    ['：', ':'],
    ['｜', '|'],
    ['＾', '^'],
    ['．', '.'],
    ['，', ','],
    ['；', ';'],
    ['＿', '_'],
    ['＃', '#'],
    ['＆', '&'],
    ['＠', '@'],
    ['＄', '$'],
    ['==', '='],
])
// 用来显示的标准字符映射表
const StandardSymbols = new Map([
    ['>=', '≥'],
    ['<=', '≤'],
    ['!=', '≠'],
    ['~=', '≈'],
    ['+-', '±'],
    ['-+', '∓'],
    ['*', '×'],
    ['/', '÷'],
    ['pi', 'π'],
    ['alpha', 'α'],
    ['beta', 'β'],
    ['gamma', 'γ'],
    ['delta', 'δ'],
    ['theta', 'θ'],
    ['lambda', 'λ'],
    ['sigma', 'σ'],
    ['omega', 'ω'],
    ['inf', '∞'],
    ['sqrt', '√'],
    ['->>', '⟹'],
    ['<->', '↔'],
    ['->', '→'],
    ['<-', '←'],
    ['<=>', '⇔'],
    ['=>', '⇒'],
    ['=<', '⇐'],
    ['sum', '∑'],
    ['prod', '∏'],
    ['int', '∫'],
    ['union', '∪'],
    ['inter', '∩'],
    ['in', '∈'],
    ['notin', '∉'],
    ['subset', '⊂'],
    ['supset', '⊃'],
    ['empty', '∅'],
    ['...', '…'],
    ['||', '∥'],
    ['deg', '°'],
])


/**
 * 格式化表达式，将异体字符转换为标准字符，并可选择性地转换为显示模式
 * @param input 输入的表达式字符串
 * @param displayMode 是否启用显示模式，默认为 false
 * @returns 格式化后的表达式字符串
 */
export const FormatExpression = (input: string, displayMode:boolean = false) => {
    // 如果输入为空，直接返回空字符串
    if (!input) return '';

    // 去除输入字符串两端的空白字符
    let result = input.trim();
    
    // 将异体字符替换为对应的标准字符（如全角括号替换为半角括号）
    for (const [variant, standard] of VariantSymbols) {
        result = result.replaceAll(variant, standard);
    }
    
    // 在显示模式下，将标准符号替换为更易读的数学符号（如 >= 替换为 ≥）
    if (displayMode) {
        for (const [standard, variant] of StandardSymbols) {
            result = result.replaceAll(standard, variant);
        }
    }
    
    return result;
}