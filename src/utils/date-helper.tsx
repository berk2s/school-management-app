export function timeSince(date: any) {
  var seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000,
  );

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' yıl';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' ay';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' gün';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' saat';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' dakika';
  }
  return Math.floor(seconds) + ' saniye';
}
