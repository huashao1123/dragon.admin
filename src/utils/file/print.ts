import { openWindow } from '..';

/**
 * Download according to the background interface file stream
 * @param {*} data
 * @param {*} bom
 */
export function printByData(data: BlobPart, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: 'application/pdf' });

  const blobURL = window.URL.createObjectURL(blob);
  const date = new Date().getTime();
  const ifr = document.createElement('iframe');
  ifr.style.display = 'none';
  ifr.style.pageBreakBefore = 'always';
  ifr.setAttribute('id', 'printPdf' + date);
  ifr.setAttribute('name', 'printPdf' + date);
  ifr.src = blobURL;
  document.body.appendChild(ifr);
  const ordonnance = document.getElementById('printPdf' + date);
  setTimeout(() => {
    ordonnance.window.print();
  }, 100);
  document.body.removeChild(ifr);
  window.URL.revokeObjectURL(blobURL);
}

/**
 * Download file according to file address
 * @param {*} sUrl
 */
export function printByUrl({
  url,
  target = '_blank',
  fileName,
}: {
  url: string;
  target?: TargetContext;
  fileName?: string;
}): boolean {
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!');
    return false;
  }
  if (isChrome || isSafari) {
    const link = document.createElement('a');
    link.href = url;
    link.target = target;

    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download';
  }

  openWindow(url, { target });
  return true;
}
