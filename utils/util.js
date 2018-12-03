const app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const loadingTextBlink = function(text) {
  //setInterval((text) => 
  {
    if (that.data.loadingStatus == "loading") {
      var loadingText = (that.data.loadingText == text + '...') ? text : (that.data.loadingText + '.');
      //console.log(loadingText);
      // that.setData({
      //   loadingText: loadingText
      // });
      return loadingText;
    } else {
      //console.log(that.data.blinkTimer);
      return false;
      clearInterval(that.data.blinkTimer);
    }
    //}, 500)
  }
}

module.exports = {
  formatTime: formatTime,
  loadingTextBlink: loadingTextBlink,
}