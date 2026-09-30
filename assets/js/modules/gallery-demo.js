/**
 * Media Chronicle — Instant Search & Offline Gallery Demo Module
 * Simulates real-time, sub-10ms local metadata filtering across family photos without cloud calls.
 */

const SAMPLE_PHOTOS = [
  {
    id: 1,
    title: 'Grand Teton Mountain Ridge',
    year: '2023',
    camera: 'Sony A7IV',
    category: 'Vacations',
    location: 'Wyoming, USA',
    filename: 'DSC04821.ARW',
    size: '28.4 MB RAW',
    path: 'E:\\DCIM\\2023_Summer\\DSC04821.ARW',
    color: '#D8F3DC'
  },
  {
    id: 2,
    title: 'Maya 8th Birthday Cake',
    year: '2022',
    camera: 'iPhone 15 Pro',
    category: 'Birthdays',
    location: 'Home Dining Room',
    filename: 'IMG_3108.HEIC',
    size: '3.2 MB HEIC',
    path: 'E:\\DCIM\\2022_Birthdays\\IMG_3108.HEIC',
    color: '#FFF0C2'
  },
  {
    id: 3,
    title: 'Thanksgiving Family Reunion',
    year: '2023',
    camera: 'Canon EOS R6',
    category: 'Family',
    location: 'Denver, Colorado',
    filename: 'CR3_0912.CR3',
    size: '31.1 MB RAW',
    path: 'E:\\DCIM\\2023_Holidays\\CR3_0912.CR3',
    color: '#FFCCD5'
  },
  {
    id: 4,
    title: 'Golden Retriever at Pine Lake',
    year: '2021',
    camera: 'Sony A7IV',
    category: 'Pets',
    location: 'Pine Lake Trail',
    filename: 'DSC01942.ARW',
    size: '26.8 MB RAW',
    path: 'E:\\DCIM\\2021_Outdoors\\DSC01942.ARW',
    color: '#E8D7FF'
  },
  {
    id: 5,
    title: 'Summer Seaside Boardwalk',
    year: '2024',
    camera: 'iPhone 15 Pro',
    category: 'Vacations',
    location: 'San Diego, CA',
    filename: 'IMG_5419.HEIC',
    size: '3.8 MB HEIC',
    path: 'E:\\DCIM\\2024_Summer\\IMG_5419.HEIC',
    color: '#D0F4DE'
  },
  {
    id: 6,
    title: 'Christmas Eve Living Room',
    year: '2021',
    camera: 'Canon EOS R6',
    category: 'Family',
    location: 'Grandparents House',
    filename: 'CR3_8804.CR3',
    size: '33.5 MB RAW',
    path: 'E:\\DCIM\\2021_Winter\\CR3_8804.CR3',
    color: '#FFF3F5'
  }
];

export function initGalleryDemo() {
  const searchInput = document.getElementById('gallery-search-input');
  const yearPills = document.querySelectorAll('.gallery-filter-pill[data-filter-group="year"]');
  const catPills = document.querySelectorAll('.gallery-filter-pill[data-filter-group="cat"]');
  const cameraPills = document.querySelectorAll('.gallery-filter-pill[data-filter-group="camera"]');
  const resultsContainer = document.getElementById('gallery-results-grid');
  const resultCount = document.getElementById('gallery-result-count');
  const filterSpeed = document.getElementById('gallery-filter-speed');

  if (!resultsContainer) return;

  let activeYear = 'all';
  let activeCat = 'all';
  let activeCamera = 'all';
  let searchQuery = '';

  function renderPhotos() {
    const startTime = performance.now();

    const filtered = SAMPLE_PHOTOS.filter(photo => {
      // Year filter
      if (activeYear !== 'all' && photo.year !== activeYear) return false;
      // Category filter
      if (activeCat !== 'all' && photo.category !== activeCat) return false;
      // Camera filter
      if (activeCamera !== 'all' && photo.camera !== activeCamera) return false;
      // Text query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const haystack = `${photo.title} ${photo.location} ${photo.filename} ${photo.camera} ${photo.category} ${photo.year}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const elapsed = Math.max(1, Math.round((performance.now() - startTime) * 10) / 10);

    if (resultCount) {
      resultCount.textContent = `Showing ${filtered.length} of ${SAMPLE_PHOTOS.length} items`;
    }
    if (filterSpeed) {
      filterSpeed.textContent = `⚡ Sub-10ms Local Index (${elapsed} ms) • 0 bytes uploaded`;
    }

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="gallery-empty-state">
          <p>No photos match your current filters.</p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-filters">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', resetAll);
      }
      return;
    }

    resultsContainer.innerHTML = filtered.map(p => `
      <div class="photo-demo-card">
        <div class="photo-demo-thumb" style="background-color: ${p.color};">
          <div class="photo-demo-badge">${p.year}</div>
          <div class="photo-demo-icon">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
          <span class="photo-demo-format">${p.size}</span>
        </div>
        <div class="photo-demo-info">
          <h4 class="photo-demo-title">${p.title}</h4>
          <div class="photo-demo-meta">
            <span class="meta-tag">${p.category}</span>
            <span class="meta-tag">${p.camera}</span>
          </div>
          <div class="photo-demo-path" title="${p.path}">${p.path}</div>
        </div>
      </div>
    `).join('');
  }

  function resetAll() {
    activeYear = 'all';
    activeCat = 'all';
    activeCamera = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.gallery-filter-pill').forEach(pill => {
      if (pill.getAttribute('data-value') === 'all') {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    renderPhotos();
  }

  // Setup pill click listeners
  function setupPillGroup(pills, setter) {
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        setter(pill.getAttribute('data-value'));
        renderPhotos();
      });
    });
  }

  setupPillGroup(yearPills, val => { activeYear = val; });
  setupPillGroup(catPills, val => { activeCat = val; });
  setupPillGroup(cameraPills, val => { activeCamera = val; });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPhotos();
    });
  }

  // Initial render
  renderPhotos();
}
