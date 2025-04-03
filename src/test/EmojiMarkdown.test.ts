import { EmojiMarkdown } from '../actions/EmojiMarkdown';

describe('EmojiMarkdown', () => {
    let renderer: any;

    beforeAll(() => {
        renderer = EmojiMarkdown;
    });

    describe('标题处理', () => {
        it('应该正确处理一级标题', () => {
            const input = '# 测试标题';
            expect(renderer(input)).toBe('📌📌📌>>> 测试标题 <<<📌📌📌\n\n');
        });

        it('应该正确处理二级标题', () => {
            const input = '## 测试标题';
            expect(renderer(input)).toBe('📌📌>> 测试标题 <<📌📌\n\n');
        });

        it('应该正确处理三级标题', () => {
            const input = '### 测试标题';
            expect(renderer(input)).toBe('📌> 测试标题 <📌\n\n');
        });

        it('应该正确处理带有结尾#的标题', () => {
            const input = '# 测试标题 #';
            expect(renderer(input)).toBe('📌📌📌>>> 测试标题 <<<📌📌📌\n\n');
        });
    });

    describe('列表处理', () => {
        describe('无序列表', () => {
            it('应该正确处理无序列表', () => {
                const input = '- 列表项';
                expect(renderer(input)).toBe('🔸 列表项');
            });

            it('应该正确处理缩进的无序列表', () => {
                const input = '  - 缩进列表项';
                expect(renderer(input)).toBe('🔹 缩进列表项');
            });

            it('应该正确处理多级缩进的无序列表', () => {
                const input = '- 一级\n  - 二级\n    - 三级';
                expect(renderer(input)).toBe('🔸 一级\n🔹 二级\n🔹 三级');
            });
        });

        describe('有序列表', () => {
            it('应该正确处理有序列表', () => {
                const input = '1. 列表项';
                expect(renderer(input)).toBe('1️⃣ 列表项');
            });

            it('应该正确处理缩进的有序列表', () => {
                const input = '  2. 缩进列表项';
                expect(renderer(input)).toBe('  2️⃣ 缩进列表项');
            });

            it('应该正确处理多位数的有序列表', () => {
                const input = '12. 多位数列表项';
                expect(renderer(input)).toBe('1️⃣2️⃣ 多位数列表项');
            });

            it('应该正确处理混合列表', () => {
                const input = '1. 一级\n  - 二级\n    2. 三级';
                expect(renderer(input)).toBe('1️⃣ 一级\n🔹 二级\n    2️⃣ 三级');
            });
        });
    });

    describe('引用块处理', () => {
        it('应该正确处理单行引用', () => {
            const input = '> 引用文本';
            expect(renderer(input)).toBe('📜➤ 引用文本');
        });

        it('应该正确处理多行引用', () => {
            const input = '> 第一行\n> 第二行';
            expect(renderer(input)).toBe('📜➤ 第一行\n📜➤ 第二行');
        });

        // it('应该正确处理嵌套引用', () => {
        //     const input = '> 外层引用\n>> 内层引用';
        //     expect(renderer(input)).toBe('📜➤ 外层引用\n📜➤ 内层引用');
        // });
    });

    describe('分隔线处理', () => {
        it('应该正确处理连字符分隔线', () => {
            const input = '---';
            expect(renderer(input)).toBe('⭐ ═══════ ⭐ ═══════ ⭐');
        });

        it('应该正确处理下划线分隔线', () => {
            const input = '___';
            expect(renderer(input)).toBe('⭐ ═══════ ⭐ ═══════ ⭐');
        });

        it('应该正确处理星号分隔线', () => {
            const input = '***';
            expect(renderer(input)).toBe('⭐ ═══════ ⭐ ═══════ ⭐');
        });
    });

    describe('行内文本处理', () => {
        it('应该正确处理粗体文本', () => {
            const input = '**粗体文本**';
            expect(renderer(input)).toBe('【粗体文本】');
        });

        it('应该正确处理下划线粗体文本', () => {
            const input = '__下划线粗体__';
            expect(renderer(input)).toBe('【下划线粗体】');
        });

        it('应该正确处理斜体文本', () => {
            const input = '*斜体文本*';
            expect(renderer(input)).toBe('『斜体文本』');
        });

        it('应该正确处理下划线斜体文本', () => {
            const input = '_下划线斜体_';
            expect(renderer(input)).toBe('『下划线斜体』');
        });

        it('应该正确处理删除线文本', () => {
            const input = '~~删除线文本~~';
            expect(renderer(input)).toBe('❌删除线文本❌');
        });

        it('应该正确处理高亮文本', () => {
            const input = '==高亮文本==';
            expect(renderer(input)).toBe('💡高亮文本💡');
        });

        it('应该正确处理行内代码', () => {
            const input = '`行内代码`';
            expect(renderer(input)).toBe('💻行内代码💻');
        });

        // it('应该正确处理嵌套样式', () => {
        //     const input = '**粗体中的*斜体***';
        //     expect(renderer(input)).toBe('【粗体中的『斜体』】');
        // });
    });

    describe('代码块处理', () => {
        it('应该正确处理无语言代码块', () => {
            const input = '```\nconst test = true;\n```\n';
            expect(renderer(input)).toBe('💻Code💻\nconst test = true;\n💻Code End!💻');
        });

        it('应该正确处理带语言代码块', () => {
            const input = '```javascript\nconst test = true;\n```\n';
            expect(renderer(input)).toBe('💻javascript Code💻\nconst test = true;\n💻Code End!💻');
        });

        it('应该正确处理多行代码块', () => {
            const input = '```\nline1\nline2\nline3\n```\n';
            expect(renderer(input)).toBe('💻Code💻\nline1\nline2\nline3\n💻Code End!💻');
        });
    });

    describe('链接处理', () => {
        it('应该正确处理行内链接', () => {
            const input = '[链接文本](https://example.com)';
            expect(renderer(input)).toBe('🔗【链接文本】( https://example.com )');
        });

        it('应该正确处理引用链接', () => {
            const input = '[链接文本][引用标识]';
            expect(renderer(input)).toBe('🔗【链接文本】[📍引用标识]');
        });

        it('应该正确处理带有脚注的引用链接', () => {
            const input = '[链接文本][^1]';
            expect(renderer(input)).toBe('🔗【链接文本】[📍1]');
        });
    });

    describe('任务状态标记处理', () => {
        it('应该正确处理空状态任务', () => {
            const input = '- [ ] 待办任务';
            expect(renderer(input)).toBe('🔸⬜ 待办任务');
        });

        it('应该正确处理未完成状态任务', () => {
            const input = '- [/] 进行中任务';
            expect(renderer(input)).toBe('🔸🚧 进行中任务');
        });

        it('应该正确处理已完成状态任务', () => {
            const input = '- [x] 已完成任务';
            expect(renderer(input)).toBe('🔸✅ 已完成任务');
        });

        it('应该正确处理已取消状态任务', () => {
            const input = '- [-] 已取消任务';
            expect(renderer(input)).toBe('🔸❌ 已取消任务');
        });

        it('应该正确处理已转发状态任务', () => {
            const input = '- [>] 已转发任务';
            expect(renderer(input)).toBe('🔸↗️ 已转发任务');
        });

        it('应该正确处理日程安排状态任务', () => {
            const input = '- [<] 日程任务';
            expect(renderer(input)).toBe('🔸📅 日程任务');
        });

        it('应该正确处理问题状态任务', () => {
            const input = '- [?] 问题任务';
            expect(renderer(input)).toBe('🔸❓ 问题任务');
        });

        it('应该正确处理重要状态任务', () => {
            const input = '- [!] 重要任务';
            expect(renderer(input)).toBe('🔸❗ 重要任务');
        });

        it('应该正确处理星标状态任务', () => {
            const input = '- [*] 星标任务';
            expect(renderer(input)).toBe('🔸⭐ 星标任务');
        });

        it('应该正确处理引用状态任务', () => {
            const input = '- ["] 引用任务';
            expect(renderer(input)).toBe('🔸💬 引用任务');
        });

        it('应该正确处理位置状态任务', () => {
            const input = '- [l] 位置任务';
            expect(renderer(input)).toBe('🔸📍 位置任务');
        });

        it('应该正确处理书签状态任务', () => {
            const input = '- [b] 书签任务';
            expect(renderer(input)).toBe('🔸🔖 书签任务');
        });

        it('应该正确处理信息状态任务', () => {
            const input = '- [i] 信息任务';
            expect(renderer(input)).toBe('🔸ℹ️ 信息任务');
        });

        it('应该正确处理储蓄状态任务', () => {
            const input = '- [S] 储蓄任务';
            expect(renderer(input)).toBe('🔸💰 储蓄任务');
        });

        it('应该正确处理想法状态任务', () => {
            const input = '- [I] 想法任务';
            expect(renderer(input)).toBe('🔸💡 想法任务');
        });

        it('应该正确处理优点状态任务', () => {
            const input = '- [p] 优点任务';
            expect(renderer(input)).toBe('🔸👍 优点任务');
        });

        it('应该正确处理缺点状态任务', () => {
            const input = '- [c] 缺点任务';
            expect(renderer(input)).toBe('🔸👎 缺点任务');
        });

        it('应该正确处理火热状态任务', () => {
            const input = '- [f] 火热任务';
            expect(renderer(input)).toBe('🔸🔥 火热任务');
        });

        it('应该正确处理关键状态任务', () => {
            const input = '- [k] 关键任务';
            expect(renderer(input)).toBe('🔸🔑 关键任务');
        });

        it('应该正确处理胜利状态任务', () => {
            const input = '- [w] 胜利任务';
            expect(renderer(input)).toBe('🔸🏆 胜利任务');
        });

        it('应该正确处理上升状态任务', () => {
            const input = '- [u] 上升任务';
            expect(renderer(input)).toBe('🔸📈 上升任务');
        });

        it('应该正确处理下降状态任务', () => {
            const input = '- [d] 下降任务';
            expect(renderer(input)).toBe('🔸📉 下降任务');
        });

        it('应该正确处理未定义状态任务', () => {
            const input = '- [z] 未定义状态任务';
            expect(renderer(input)).toBe('🔸【z】 未定义状态任务');
        });

        it('应该正确处理缩进的任务状态', () => {
            const input = '  - [x] 缩进的已完成任务';
            expect(renderer(input)).toBe('🔹✅ 缩进的已完成任务');
        });
    });

    describe('复合格式处理', () => {
        it('应该正确处理空内容', () => {
            expect(renderer('')).toBe('');
        });

        it('应该正确处理复杂混合内容', () => {
            const input = `# 主标题
## 副标题
- **粗体列表项**
  - *斜体子项*
> 引用中的\`代码\`
\`\`\`
示例代码
\`\`\`
[链接](https://example.com)`;
            const result = renderer(input);
            expect(result).toContain('📌📌📌>>> 主标题 <<<📌📌📌');
            expect(result).toContain('📌📌>> 副标题 <<📌📌');
            expect(result).toContain('🔸 【粗体列表项】');
            expect(result).toContain('🔹 『斜体子项』');
            expect(result).toContain('📜➤ 引用中的💻代码💻');
            expect(result).toContain('💻Code💻');
            expect(result).toContain('🔗【链接】( https://example.com )');
        });

        it('应该正确处理特殊字符', () => {
            const input = '# 标题 *with* `code` and [link](url) ~~删除~~ ==高亮==';
            const result = renderer(input);
            expect(result).toContain('📌📌📌');
            expect(result).toContain('『with』');
            expect(result).toContain('💻code💻');
            expect(result).toContain('🔗【link】');
            expect(result).toContain('❌删除❌');
            expect(result).toContain('💡高亮💡');
        });
    });
});