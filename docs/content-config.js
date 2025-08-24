// 文案配置文件
// 支持多语言配置，便于国际化扩展

const content = {
  // 仓库配置
  repo: {
    baseUrl: "https://github.com/twiceyuan/lmk-tester-docs",
    releasesUrl: "./release",  // 本地 release 目录
    issuesUrl: "https://github.com/twiceyuan/lmk-tester/issues"
  },
  // 元数据
  meta: {
    title: "LMK Tester - Android 应用恢复测试工具",
    description: "通过模拟内存压力触发 LMK，验证 Android 应用在被系统回收后的恢复能力"
  },

  // 导航栏
  nav: {
    logo: "LMK Tester",
    links: {
      features: "功能特性",
      download: "下载",
      about: "关于"
    },
    themeToggle: "切换主题"
  },

  // 首页 Hero 区域
  hero: {
    title: {
      line1: "Android Low Memory Killer",
      highlight: "测试小工具"
    },
    subtitle: "LMK Tester 是一款测试工具，通过模拟内存压力触发系统 LMK，帮助开发者验证应用的恢复机制",
    buttons: {
      download: "立即下载",
      sourceCode: "Play Store (Coming Soon)"
    }
  },

  // 功能特性
  features: {
    title: "核心功能",
    subtitle: "多种功能帮助您测试应用内存表现",
    items: [
      {
        title: "灵活的内存分配",
        description: "支持 1MB 到 512MB 的内存块分配，精确控制内存压力测试"
      },
      {
        title: "实时监控",
        description: "实时显示内存使用状况，随时掌握系统内存状态"
      },
      {
        title: "应用监听",
        description: "集成 Shizuku 框架，支持监听和启动其他应用，测试多应用场景"
      },
      {
        title: "溢出保护",
        description: "检测内存溢出风险，提供提醒和恢复机制"
      }
    ]
  },

  // 下载区域
  download: {
    title: "下载应用",
    subtitle: "支持 Android 7.0+ 系统",
    version: {
      title: "最新版本",
      number: "v1.0.1",
      date: "发布于 2024年8月"
    },
    requirements: {
      title: "系统要求",
      items: [
        "Android 7.0+ (API 24+)",
        "建议安装 Shizuku 以获得完整功能",
        "支持 arm64-v8a、armeabi-v7a"
      ]
    },
    qr: {
      scanText: "扫码下载",
      downloadLink: "访问下载页面"
    }
  },

  // 关于项目
  about: {
    title: "关于项目",
    subtitle: "开源、免费、持续改进",
    description: [
      "LMK Tester 是一个免费项目，帮助开发者验证 Android 应用在内存不足时的恢复能力。通过手动分配内存制造压力，触发系统 LMK 机制回收进程，从而测试应用是否能正确恢复状态和数据。"
    ]
  },

  // 页脚
  footer: {
    logo: {
      name: "LMK Tester",
      description: "Android 应用恢复测试工具"
    },
    links: {
      title: "链接",
      items: [
        { text: "下载地址", url: "./release" },
        { text: "反馈问题", url: "https://github.com/twiceyuan/lmk-tester/issues" }
      ]
    },
    license: {
      title: "许可证",
      text: "MIT License - 开源免费"
    },
    copyright: "&copy; 2024 LMK Tester. Made with ❤️ by twiceyuan"
  },

  // 其他文本
  common: {
    appScreenshotAlt: "LMK Tester 应用截图",
    githubReleases: "GitHub Releases"
  }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = content;
} else {
  window.ContentConfig = content;
}