function generateVibrantGradientColors(startColorRGB, endColorRGB, count, theme) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const ratio = i / (count - 1);
    const r = Math.round(startColorRGB[0] + ratio * (endColorRGB[0] - startColorRGB[0]));
    const g = Math.round(startColorRGB[1] + ratio * (endColorRGB[1] - startColorRGB[1]));
    const b = Math.round(startColorRGB[2] + ratio * (endColorRGB[2] - startColorRGB[2]));
    const opacity = theme === 'dark' ? 0.85 : 0.95;
    colors.push(`rgba(${r}, ${g}, ${b}, ${opacity})`);
  }
  return colors;
}

const paletteRGB = {
  light: {
    bgPrimary: [248, 248, 248],
    bgSecondary: [234, 234, 234],
    bgTertiary: [220, 220, 220],
    accentLight: [0, 123, 255],
    accentDark: [0, 86, 179],
    newBlueShade: [33, 150, 243],
    blueGreenShade: [0, 168, 150],
    textPrimary: [51, 51, 51],
    textSecondary: [102, 102, 102],
  },
  dark: {
    bgPrimary: [5, 16, 26],
    bgSecondary: [10, 28, 43],
    bgTertiary: [21, 42, 63],
    accentLight: [100, 181, 246],
    accentDark: [63, 114, 175],
    newBlueShade: [33, 150, 243],
    blueGreenShade: [32, 178, 170],
    textPrimary: [224, 239, 255],
    textSecondary: [160, 176, 192],
  },
};

function applyChartTheme(theme) {
  const currentPalette = paletteRGB[theme];
  Chart.defaults.color = `rgb(${currentPalette.textSecondary.join(',')})`;
  Chart.defaults.borderColor = `rgba(${currentPalette.bgTertiary.join(',')}, 0.5)`;
  Chart.defaults.backgroundColor = 'transparent';

  Chart.defaults.plugins.tooltip = {
    enabled: true,
    backgroundColor: `rgba(${currentPalette.textPrimary.join(',')}, 0.95)`,
    borderColor: `rgb(${currentPalette.accentLight.join(',')})`,
    borderWidth: 1,
    cornerRadius: 12,
    padding: 16,
    titleColor: `rgb(${currentPalette.bgPrimary.join(',')})`,
    bodyColor: `rgb(${currentPalette.bgSecondary.join(',')})`,
    titleFont: { size: 16, weight: '600' },
    bodyFont: { size: 14 },
    displayColors: false,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  };
}

const data = {
  workspace: {
    labels: ['On-Site', 'Remote', 'Hybrid'],
    data: [57, 24, 19],
  },
  languages: {
    labels: ['JavaScript', 'Python', 'PHP', 'SQL', 'TypeScript', 'Java', 'C#', 'Dart', 'C++', 'Kotlin', 'Bash', 'Go', 'Ruby'],
    data: [39, 23, 16, 15, 15, 13, 7, 5, 4, 3, 2, 2, 2],
  },
  frontendFrameworks: {
    labels: ['React', 'Angular', 'Flutter', 'Next', 'React-Native', 'Vue', 'jQuery'],
    data: [30, 11, 9, 8, 5, 5, 3],
  },
  backendFrameworks: {
    labels: ['Laravel', 'Spring', 'Django', '.NET', 'Nest', 'Express'],
    data: [11, 9, 8, 7, 5, 4],
  },
  databases: {
    labels: ['PostgreSQL', 'MySQL', 'Firebase', 'MongoDB', 'SQL-Server'],
    data: [27, 15, 9, 8, 7],
  },
  styling: {
    labels: ['CSS', 'HTML', 'Tailwind', 'Bootstrap', 'WordPress'],
    data: [20, 18, 10, 5, 3],
  },
  devops: {
    labels: ['Docker', 'Odoo', 'AWS', 'Azure', 'Kubernetes', 'Jenkins', 'Terraform', 'Kafka'],
    data: [15, 10, 9, 7, 4, 3, 3, 2],
  },
};

let charts = {};

function createCharts(theme) {
  for (const chartKey in charts) {
    if (charts[chartKey]) {
      charts[chartKey].destroy();
    }
  }

  applyChartTheme(theme);
  const currentPalette = paletteRGB[theme];
  const workspaceCtx = document.getElementById('workspaceChart').getContext('2d');
  charts.workspace = new Chart(workspaceCtx, {
    type: 'doughnut',
    data: {
      labels: data.workspace.labels,
      datasets: [
        {
          data: data.workspace.data,
          backgroundColor: [`rgba(${currentPalette.accentDark.join(',')}, 0.95)`, `rgba(${currentPalette.accentLight.join(',')}, 0.95)`, `rgba(${currentPalette.blueGreenShade.join(',')}, 0.95)`],
          borderColor: `rgb(${currentPalette.bgPrimary.join(',')})`,
          cutout: '75%',
          spacing: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              return `${ctx.label}: ${ctx.parsed}%`;
            },
          },
        },
      },
      animation: {
        animateRotate: true,
        duration: 2000,
        easing: 'easeOutQuart',
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      interaction: {
        mode: 'nearest',
        intersect: true,
      },
    },
  });

  const languagesCtx = document.getElementById('languagesChart').getContext('2d');
  charts.languages = new Chart(languagesCtx, {
    type: 'bar',
    data: {
      labels: data.languages.labels,
      datasets: [
        {
          data: data.languages.data,
          backgroundColor: generateVibrantGradientColors(currentPalette.accentDark, currentPalette.blueGreenShade, data.languages.labels.length, theme),
          borderColor: `rgba(${currentPalette.accentLight.join(',')}, 0.7)`,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              return `${ctx.label}: ${ctx.parsed.x}%`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: `rgba(${currentPalette.bgTertiary.join(',')}, 0.5)` },
          ticks: {
            color: `rgb(${currentPalette.textSecondary.join(',')})`,
            callback: (value) => value + '%',
          },
        },
        y: {
          grid: { display: false },
          ticks: { color: `rgb(${currentPalette.textPrimary.join(',')})`, font: { size: 14, weight: '500' } },
        },
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart',
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      interaction: {
        mode: 'nearest',
        intersect: true,
      },
    },
  });

  const frontendCtx = document.getElementById('frontendChart').getContext('2d');
  charts.frontend = new Chart(frontendCtx, {
    type: 'bar',
    data: {
      labels: data.frontendFrameworks.labels,
      datasets: [
        {
          data: data.frontendFrameworks.data,
          backgroundColor: generateVibrantGradientColors(currentPalette.blueGreenShade, currentPalette.accentLight, data.frontendFrameworks.labels.length, theme),
          borderColor: `rgba(${currentPalette.blueGreenShade.join(',')}, 0.7)`,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              return `${ctx.label}: ${ctx.parsed.y}%`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: `rgb(${currentPalette.textPrimary.join(',')})`, font: { size: 14, weight: '500' } },
        },
        y: {
          beginAtZero: true,
          grid: { color: `rgba(${currentPalette.bgTertiary.join(',')}, 0.5)` },
          ticks: {
            color: `rgb(${currentPalette.textSecondary.join(',')})`,
            callback: (value) => value + '%',
          },
        },
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart',
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      interaction: {
        mode: 'nearest',
        intersect: true,
      },
    },
  });

  const backendCtx = document.getElementById('backendChart').getContext('2d');
  charts.backend = new Chart(backendCtx, {
    type: 'bar',
    data: {
      labels: data.backendFrameworks.labels,
      datasets: [
        {
          data: data.backendFrameworks.data,
          backgroundColor: generateVibrantGradientColors(currentPalette.accentDark, currentPalette.blueGreenShade, data.backendFrameworks.labels.length, theme),
          borderColor: `rgba(${currentPalette.accentLight.join(',')}, 0.7)`,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              return `${ctx.label}: ${ctx.parsed.y}%`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: `rgb(${currentPalette.textPrimary.join(',')})`, font: { size: 14, weight: '500' } },
        },
        y: {
          beginAtZero: true,
          grid: { color: `rgba(${currentPalette.bgTertiary.join(',')}, 0.5)` },
          ticks: {
            color: `rgb(${currentPalette.textSecondary.join(',')})`,
            callback: (value) => value + '%',
          },
        },
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart',
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      interaction: {
        mode: 'nearest',
        intersect: true,
      },
    },
  });

  const databaseCtx = document.getElementById('databaseChart').getContext('2d');
  charts.database = new Chart(databaseCtx, {
    type: 'bar',
    data: {
      labels: data.databases.labels,
      datasets: [
        {
          data: data.databases.data,
          backgroundColor: generateVibrantGradientColors(currentPalette.blueGreenShade, currentPalette.accentLight, data.databases.labels.length, theme),
          borderColor: `rgba(${currentPalette.blueGreenShade.join(',')}, 0.7)`,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              return `${ctx.label}: ${ctx.parsed.x}%`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: `rgba(${currentPalette.bgTertiary.join(',')}, 0.5)` },
          ticks: {
            color: `rgb(${currentPalette.textSecondary.join(',')})`,
            callback: (value) => value + '%',
          },
        },
        y: {
          grid: { display: false },
          ticks: { color: `rgb(${currentPalette.textPrimary.join(',')})`, font: { size: 14, weight: '500' } },
        },
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart',
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      interaction: {
        mode: 'nearest',
        intersect: true,
      },
    },
  });

  const stylingCtx = document.getElementById('stylingChart').getContext('2d');
  charts.styling = new Chart(stylingCtx, {
    type: 'pie',
    data: {
      labels: data.styling.labels,
      datasets: [
        {
          data: data.styling.data,
          backgroundColor: generateVibrantGradientColors(currentPalette.accentDark, currentPalette.blueGreenShade, data.styling.labels.length, theme),
          borderColor: `rgb(${currentPalette.bgPrimary.join(',')})`,
          cutout: '0%',
          spacing: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: `rgb(${currentPalette.textSecondary.join(',')})`,
            font: { size: 13, weight: '500' },
            padding: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              return `${ctx.label}: ${ctx.parsed}%`;
            },
          },
        },
      },
      animation: {
        animateScale: true,
        duration: 2000,
        easing: 'easeOutQuart',
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      interaction: {
        mode: 'nearest',
        intersect: true,
      },
    },
  });
}

const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  updateToggleButton(newTheme);
  createCharts(newTheme);
}

function updateToggleButton(theme) {
  const iconSpan = themeToggleBtn.querySelector('.icon');
  const textSpan = themeToggleBtn.querySelector('span:last-child');
  if (theme === 'dark') {
    iconSpan.textContent = '🌙';
    textSpan.textContent = 'Dark Mode';
  } else {
    iconSpan.textContent = '☀️';
    textSpan.textContent = 'Light Mode';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.animate-slide-up, .animate-fade-scale').forEach((el, i) => {
    const delay = parseFloat(el.style.animationDelay || '0s') * 1000;
    setTimeout(() => {
      el.classList.add('animate-active');
    }, delay);
  });

  document.getElementById('currentYear').textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateToggleButton(savedTheme);
  createCharts(savedTheme);
});

themeToggleBtn.addEventListener('click', toggleTheme);
