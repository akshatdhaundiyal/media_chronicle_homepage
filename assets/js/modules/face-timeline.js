/**
 * YOLO Face Recognition & Age Variant Timeline Inspector Module
 */

export function initFaceAgeEngine() {
  const agePills = document.querySelectorAll('.age-pill');
  const faceBoxes = document.querySelectorAll('.face-bbox');

  const faceIdVal = document.getElementById('face-id-val');
  const faceConfVal = document.getElementById('face-conf-val');
  const faceDistVal = document.getElementById('face-dist-val');
  const faceVariantVal = document.getElementById('face-variant-val');
  const faceConflictVal = document.getElementById('face-conflict-val');

  const ageData = {
    '7': {
      id: 'Maya Sharma',
      conf: '96.2%',
      dist: '0.0 (Anchor Base)',
      variant: 'Childhood Base',
      conflict: '✓ Verified Match',
      isConflict: false
    },
    '16': {
      id: 'Maya Sharma',
      conf: '91.8%',
      dist: '14.2 (Cosine Match)',
      variant: 'Adolescence',
      conflict: '✓ Verified Match',
      isConflict: false
    },
    '24': {
      id: 'Maya Sharma',
      conf: '94.7%',
      dist: '22.8 (Cosine Match)',
      variant: 'Young Adult',
      conflict: '✓ Verified Match',
      isConflict: false
    },
    '35': {
      id: 'Maya Sharma',
      conf: '89.4%',
      dist: '27.4 (>25.0 Cosine Dist)',
      variant: 'Mature Adult (Variant)',
      conflict: '⚡ Age Variant Confirmed',
      isConflict: true
    }
  };

  function selectStage(stageKey) {
    const info = ageData[stageKey];
    if (!info) return;

    // Update active pill
    agePills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-age') === stageKey);
    });

    // Update active bbox
    faceBoxes.forEach(box => {
      box.classList.toggle('active', box.getAttribute('data-stage') === stageKey);
    });

    // Update readout values
    if (faceIdVal) faceIdVal.textContent = info.id;
    if (faceConfVal) faceConfVal.textContent = info.conf;
    if (faceDistVal) faceDistVal.textContent = info.dist;
    if (faceVariantVal) faceVariantVal.textContent = info.variant;

    if (faceConflictVal) {
      faceConflictVal.textContent = info.conflict;
      if (info.isConflict) {
        faceConflictVal.style.background = 'rgba(244, 63, 94, 0.18)';
        faceConflictVal.style.color = '#FDA4AF';
        faceConflictVal.style.borderColor = 'rgba(244, 63, 94, 0.4)';
      } else {
        faceConflictVal.style.background = 'rgba(16, 185, 129, 0.15)';
        faceConflictVal.style.color = '#34D399';
        faceConflictVal.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      }
    }
  }

  agePills.forEach(pill => {
    pill.addEventListener('click', () => {
      selectStage(pill.getAttribute('data-age'));
    });
  });

  faceBoxes.forEach(box => {
    box.addEventListener('click', () => {
      selectStage(box.getAttribute('data-stage'));
    });
  });
}
