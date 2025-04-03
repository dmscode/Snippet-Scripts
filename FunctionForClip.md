# Ditto 脚本中支持的接口

## 剪切板方法

以下方法均在 clip 命名空间下

### 剪贴板文本操作函数
/**
 * @brief 获取ASCII格式的字符串内容
 * @return std::string 返回ASCII字符串
 */
std::string GetAsciiString();

/**
 * @brief 设置ASCII格式的字符串内容
 * @param stringVal 要设置的字符串值
 */
void SetAsciiString(std::string stringVal);

### 剪贴板元数据函数
/**
 * @brief 获取指定格式剪贴板内容的MD5值
 * @param clipboardFormat 剪贴板格式
 * @return std::string 返回MD5哈希值
 */
std::string GetClipMD5(std::string clipboardFormat);

/**
 * @brief 获取指定格式剪贴板内容的大小
 * @param clipboardFormat 剪贴板格式
 * @return SIZE_T 返回内容大小
 */
SIZE_T GetClipSize(std::string clipboardFormat);

### 活动窗口相关函数
/**
 * @brief 获取当前活动应用程序名称
 * @return std::string 返回应用程序名
 */
std::string GetActiveApp();

/**
 * @brief 获取当前活动窗口标题
 * @return std::string 返回窗口标题
 */
std::string GetActiveAppTitle() { return m_activeAppTitle; }

### 3.21.247.0版本新增功能
- Starting in version 3.21.247.0
/**
 * @brief 检查指定格式是否存在
 * @param clipboardFormat 剪贴板格式
 * @return BOOL 存在返回TRUE，否则FALSE
 */
BOOL FormatExists(std::string clipboardFormat);

/**
 * @brief 移除指定格式的内容
 * @param clipboardFormat 剪贴板格式
 * @return BOOL 成功返回TRUE，否则FALSE
 */
BOOL RemoveFormat(std::string clipboardFormat);

/**
 * @brief 设置父ID
 * @param parentId 父条目ID
 * @return BOOL 成功返回TRUE，否则FALSE
 */
BOOL SetParentId(int parentId);

/**
 * @brief ASCII文本正则匹配
 * @param regex 正则表达式
 * @return BOOL 匹配返回TRUE，否则FALSE
 */
BOOL AsciiTextMatchesRegex(std::string regex);

/**
 * @brief ASCII文本正则替换
 * @param regex 正则表达式
 * @param replaceWith 替换文本
 */
void AsciiTextReplaceRegex(std::string regex, std::string replaceWith);

### 3.22.21.0版本新增功能
-- Starting in version 3.22.21.0
/**
 * @brief 获取活动窗口标题
 * @return std::string 返回窗口标题
 */
std::string GetActiveAppTitle();

/**
 * @brief 设置为置顶固定项
 */
void SetMakeTopSticky();

/**
 * @brief 设置为底部固定项
 */
void SetMakeLastSticky();

/**
 * @brief 替换置顶固定项
 */
void SetReplaceTopSticky();

### 全局函数
-- global function (not accessed through clip like all others)
/**
 * @brief 格式化当前时间
 * @param format 时间格式字符串
 * @return std::string 返回格式化后的时间字符串
 */
std::string FormatCurrentTime(std::string format);

### 3.23版本新增功能
-- Starting in version 3.23
/**
 * @brief 描述文本正则匹配
 * @param regex 正则表达式
 * @return BOOL 匹配返回TRUE，否则FALSE
 */
BOOL DescriptionMatchesRegex(std::string regex);

/**
 * @brief 描述文本正则替换
 * @param regex 正则表达式
 * @param replaceWith 替换文本
 */
void DescriptionReplaceRegex(std::string regex, std::string replaceWith)

## 操作说明和注意事项

1. 有一个名为"clip"的内置变量用于访问当前剪贴板内容。
2. 每个脚本必须返回true/false值。返回true表示取消复制或粘贴操作。
3. 可以通过 选项-高级-复制时脚本/粘贴时脚本 来访问这些脚本。
4. 由于chaiscript的限制，仅支持ASCII文本。
5. 每个脚本都可以访问正在被复制或粘贴的剪贴板内容接口。

## via

https://github.com/sabrogden/Ditto/wiki/Scripting

## 悲剧

当我兴冲冲的写完了脚本，发现它的正则表达式不支持设置 flag，为此我甚至去读了它的源代码。反正就是不支持。

虽然作者说他最新的 nightly 版本正所匹配时默认忽略大小写，然而实际测试中并不行。

更严重的是脚本保存之后似乎会被编码转换导致形成乱码，这对中文十分不友好。