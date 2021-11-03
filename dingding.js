doDingDing()

function doDingDing () {
  brightScreen();
  unlockScreen();
  doing();
  lockScreen();
}

function doing () {
  // 检查无障碍权限
  auto.waitFor("normal");
  launchApp("钉钉");
  // 寻找按钮并点击
  let homeTab = desc("工作台").findOne(5000);
  let mWidth = device.width / 2;
  let mHeight = device.height - 50;
  click(mWidth, mHeight);

  // 智能填表
  let smartFill = className("android.view.View").text("智能填表")
    .findOne(8000).parent();
  if (smartFill) {
    toast("找到智能填表");
    smartFill.click();
  } else {
    toast("未找到智能填表");
    exit();
  }

  let fillIn = text("填写").findOne(8000).parent();
  if (fillIn) {
    toast("找到填写");
    fillIn.click();
  } else {
    toast("未找到填写");
    exit();
  }

  let todo = className("android.view.View").text("待填写")
    .findOne(8000);
  if (todo) {
    toast("找到待填写");
    todo.click();
  } else {
    toast("未找到待填写");
    exit();
  }

  sleep(2000);
  let execute = text("立即填写").find();
  if (execute.empty) {
    toast("找到每日打卡");
    // 点击最后一个
    execute[execute.length - 1].click();
  } else {
    toast("未找到每日打卡");
    exit();
  }

  let today = className("android.view.View").text("今天")
    .findOne(8000).parent();
  if (today) {
    toast("找到今天");
    today.click();
  } else {
    toast("未找到今天");
    exit();
  }

  // 如果有修改，重新提交
  let resubmit = className("android.view.View").text("修改")
    .findOne(2000);
  if (resubmit) {
    toast("找到修改");
    resubmit.click();
    sleep(1000);
  } else {
    toast("未找到修改");
  }


  sleep(2000);
  let position = text("获取").findOne(5000);
  if (position) {
    toast("找到获取");
    position.click();
    // 定位耗时
    sleep(3000);
  } else {
    toast("未找到获取");
    exit();
  }

  // 提交
  let commit = text("提交").findOne(2000);
  if (commit) {
    toast("找到提交");
    sleep(1000);
    commit.click();
  } else {
    toast("未找到提交");
  }
}


function brightScreen () {
  home();
  swipe(device.width / 2, 1300, device.width / 2, 300, 1000);
  device.setBrightnessMode(0) // 手动亮度模式
  device.setBrightness(20)
  device.wakeUpIfNeeded() // 唤醒设备
  device.keepScreenOn()   // 保持亮屏
  sleep(1000) // 等待屏幕亮起

  let cnt = 0;
  while (cnt < 3) {
    if (!device.isScreenOn()) {
      toast("设备未唤醒，重试")
      device.wakeUpIfNeeded()
      brightScreen()
      cnt++
    } else {
      toast("设备已唤醒")
      break
    }
  }
  sleep(1000)
}

function unlockScreen () {
  if (isDeviceLocked()) {
    // 数字锁屏
    desc().findOne().click()
    desc().findOne().click()
    desc().findOne().click()
    desc().findOne().click()
    desc().findOne().click()
    desc().findOne().click()

    sleep(1000) // 等待解锁动画完成
    home()
    sleep(1000) // 等待返回动画完成
  } else {
    return
  }
}


function lockScreen () {
  home();
  toast("锁屏");
  sleep(3000);
  click("一键锁屏");
}

// 屏幕是否为锁定状态
function isDeviceLocked () {
  importClass(android.app.KeyguardManager)
  importClass(android.content.Context)
  let km = context.getSystemService(Context.KEYGUARD_SERVICE)
  return km.isKeyguardLocked()
}
