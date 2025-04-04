import { FormatExpression } from '../actions/FormatExpression';

describe('FormatExpression', () => {
    describe('基本功能', () => {
        it('应该正确处理空输入', () => {
            expect(FormatExpression('')).toBe('');
            expect(FormatExpression(null as any)).toBe('');
            expect(FormatExpression(undefined as any)).toBe('');
        });

        it('应该去除字符串两端的空白字符', () => {
            expect(FormatExpression('  test  ')).toBe('test');
            expect(FormatExpression('\n\ttest\n')).toBe('test');
        });
    });

    describe('异体字符转换', () => {
        it('应该将全角括号转换为半角括号', () => {
            expect(FormatExpression('（test）')).toBe('(test)');
            expect(FormatExpression('【test】')).toBe('[test]');
            expect(FormatExpression('《test》')).toBe('<test>');
            expect(FormatExpression('｛test｝')).toBe('{test}');
        });

        it('应该将全角运算符转换为半角运算符', () => {
            expect(FormatExpression('＋－＊／')).toBe('+-*/');
            expect(FormatExpression('＝')).toBe('=');
            expect(FormatExpression('＜＞')).toBe('<>');
        });

        it('应该将全角标点符号转换为半角标点符号', () => {
            expect(FormatExpression('．，；：！')).toBe('.,;:!');
            expect(FormatExpression('＿＃＆＠＄')).toBe('_#&@$');
        });
    });

    describe('显示模式', () => {
        it('应该将比较运算符转换为数学符号', () => {
            expect(FormatExpression('x>=y', true)).toBe('x≥y');
            expect(FormatExpression('x<=y', true)).toBe('x≤y');
            expect(FormatExpression('x!=y', true)).toBe('x≠y');
        });

        it('应该将数学运算符转换为特殊符号', () => {
            expect(FormatExpression('2*3', true)).toBe('2×3');
            expect(FormatExpression('6/2', true)).toBe('6÷2');
            expect(FormatExpression('a+-b', true)).toBe('a±b');
        });

        it('应该将数学常量转换为对应符号', () => {
            expect(FormatExpression('2*pi', true)).toBe('2×π');
            expect(FormatExpression('sqrt(x)', true)).toBe('√(x)');
            expect(FormatExpression('alpha+beta', true)).toBe('α+β');
        });

        it('应该将逻辑运算符转换为对应符号', () => {
            expect(FormatExpression('A->B', true)).toBe('A→B');
            expect(FormatExpression('A<->B', true)).toBe('A↔B');
            expect(FormatExpression('A=>B', true)).toBe('A⇒B');
        });

        it('应该将集合运算符转换为对应符号', () => {
            expect(FormatExpression('A union B', true)).toBe('A ∪ B');
            expect(FormatExpression('x in A', true)).toBe('x ∈ A');
            expect(FormatExpression('A subset B', true)).toBe('A ⊂ B');
        });
    });

    describe('复合场景', () => {
        it('应该正确处理多重转换', () => {
            const input = '（＋）＊＝';
            expect(FormatExpression(input)).toBe('(+)*=');
            expect(FormatExpression(input, true)).toBe('(+)×=');
        });

        it('应该正确处理数学表达式', () => {
            const input = 'sqrt(x^2 + y^2) <= r';
            expect(FormatExpression(input, true)).toBe('√(x^2 + y^2) ≤ r');
        });

        it('应该正确处理逻辑表达式', () => {
            const input = '(p->q) <-> (not p union q)';
            expect(FormatExpression(input, true)).toBe('(p→q) ↔ (not p ∪ q)');
        });
    });
});