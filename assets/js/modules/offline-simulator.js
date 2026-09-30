/**
 * Media Chronicle — Drive Scanner & Offline Ingestion Simulator Module
 * Simulates in-place external drive scanning, zero-copy indexing, and offline fast-load bypass.
 */

export function appendTermLine(container, text, typeClass = '') {
  if (!container) return;
  const line = document.createElement('div');
  line.className = `term-line ${typeClass}`;
  line.textContent = text;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

export function initOfflineSimulator() {
  const driveSelect = document.getElementById('scan-drive-select');
  const btnScan = document.getElementById('btn-simulate-scan');
  const termOutput = document.getElementById('offline-terminal-output');
  const scanProgressBar = document.getElementById('scan-progress-bar');
  const scanProgressPercent = document.getElementById('scan-progress-percent');
  
  const metricFiles = document.getElementById('scan-metric-files');
  const metricDiskSpace = document.getElementById('scan-metric-disk');
  const metricDuration = document.getElementById('scan-metric-time');
  const metricNetwork = document.getElementById('scan-metric-network');

  const driveConfigs = {
    'seagate': { name: 'Seagate Backup Plus 4TB (E:)', count: 38420, ext: 'NTFS', duration: 1.48 },
    'sandisk': { name: 'SanDisk Extreme 2TB SSD (F:)', count: 18240, ext: 'exFAT', duration: 0.84 },
    'kingston': { name: 'Kingston Canvas 256GB SD (G:)', count: 4210, ext: 'FAT32', duration: 0.38 }
  };

  if (!btnScan || !termOutput) return;

  btnScan.addEventListener('click', () => {
    btnScan.disabled = true;
    btnScan.style.opacity = '0.6';

    const selectedDriveKey = driveSelect ? driveSelect.value : 'seagate';
    const driveInfo = driveConfigs[selectedDriveKey] || driveConfigs['seagate'];

    if (scanProgressBar) {
      scanProgressBar.style.width = '0%';
    }
    if (scanProgressPercent) {
      scanProgressPercent.textContent = '0%';
    }

    appendTermLine(termOutput, '--------------------------------------------------', 'dim');
    appendTermLine(termOutput, `[DRIVE MOUNTED] Detected: ${driveInfo.name} [${driveInfo.ext}] (Read-Only Mode)`, 'info');
    appendTermLine(termOutput, `[INDEXING PIPELINE] Direct filesystem read initiated — zero files copied to C:\\`, 'info');

    let currentProgress = 0;
    const totalSteps = 20;
    const intervalTime = (driveInfo.duration * 1000) / totalSteps;

    const interval = setInterval(() => {
      currentProgress += 5;
      const scannedSoFar = Math.round((currentProgress / 100) * driveInfo.count);

      if (scanProgressBar) {
        scanProgressBar.style.width = `${currentProgress}%`;
      }
      if (scanProgressPercent) {
        scanProgressPercent.textContent = `${currentProgress}%`;
      }

      if (currentProgress === 20) {
        appendTermLine(termOutput, `[TRAVERSAL] Indexed ${scannedSoFar.toLocaleString()} files across DCIM/ and Archive/ directories.`, 'info');
      } else if (currentProgress === 50) {
        appendTermLine(termOutput, `[METADATA] Extracted EXIF timestamps, camera models, and GPS tags.`, 'info');
      } else if (currentProgress === 75) {
        appendTermLine(termOutput, `[THUMBNAILS] Built fast sub-millisecond LRU preview cache on drive.`, 'info');
      } else if (currentProgress >= 100) {
        clearInterval(interval);

        appendTermLine(termOutput, `[SAFEGUARD] SHA-256 deduplication verified. 0 bytes copied to internal disk.`, 'success');
        appendTermLine(termOutput, `[AIR-GAP AUDIT] 0 outbound network requests. 100% Offline & Private.`, 'highlight');
        appendTermLine(termOutput, `[COMPLETE] Successfully indexed ${driveInfo.count.toLocaleString()} photos in ${driveInfo.duration}s!`, 'success');

        if (metricFiles) metricFiles.textContent = `${driveInfo.count.toLocaleString()} Photos`;
        if (metricDiskSpace) metricDiskSpace.textContent = '0 Bytes (In-Place Read)';
        if (metricDuration) metricDuration.textContent = `${driveInfo.duration}s`;
        if (metricNetwork) metricNetwork.textContent = '0 B (100% Offline)';

        btnScan.disabled = false;
        btnScan.style.opacity = '1';
      }
    }, intervalTime);
  });
}
