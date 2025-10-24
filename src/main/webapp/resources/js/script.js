const CONFIG = {
    X_VALUES: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5],
    Y_MIN: -5,
    Y_MAX: 3,
    R_MIN: 2,
    R_MAX: 5,
    R_DEFAULT: 3,
    GRAPH_SIZE: 400,
    POINT_RADIUS: 4
};

let currentR = CONFIG.R_DEFAULT;
let points = [];

const checkHitLocal = (x, y, r) => {
    if (r <= 0) return false;

    if (x > 0 && y > 0) {
        return (x * x + y * y) <= (r * r);
    }

    if (x <= 0 && y >= 0) {
        return x >= -r && y <= r / 2;
    }

    if (x >= 0 && y <= 0) {
        return x <= r / 2 && y >= -r / 2 && y >= -x;
    }

    if (x <= 0 && y <= 0) {
        return false;
    }
    
    return false;
};

const drawPoint = (ctx, x, y, hit, r) => {
    const UNIT = 60;
    const cx = CONFIG.GRAPH_SIZE / 2;
    const cy = CONFIG.GRAPH_SIZE / 2;

    const pixelX = cx + x * UNIT;
    const pixelY = cy - y * UNIT;

    if (pixelX < 0 || pixelX > CONFIG.GRAPH_SIZE || pixelY < 0 || pixelY > CONFIG.GRAPH_SIZE) {
        return;
    }
    
    ctx.save();
    ctx.fillStyle = hit ? "#27ae60" : "#e74c3c"; 
    ctx.strokeStyle = hit ? "#229954" : "#c0392b";
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, CONFIG.POINT_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};

const addPoint = (x, y, hit, r) => {
    points.push({ x, y, hit, r });
    drawAllPoints();
};

const drawAllPoints = () => {
    const canvas = document.getElementById("graph");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    
    points.forEach(point => {
        drawPoint(ctx, point.x, point.y, point.hit, point.r);
    });
};

const initGraph = () => {
    const canvas = document.getElementById("graph");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const { GRAPH_SIZE } = CONFIG;
    
    const UNIT = 60;
    const R = UNIT * currentR;
    const cx = GRAPH_SIZE / 2;
    const cy = GRAPH_SIZE / 2;
    
    ctx.clearRect(0, 0, GRAPH_SIZE, GRAPH_SIZE);
    ctx.translate(cx, cy);
    ctx.scale(1, -1);
    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-GRAPH_SIZE/2, 0);
    ctx.lineTo(GRAPH_SIZE/2, 0);
    ctx.moveTo(0, -GRAPH_SIZE/2);
    ctx.lineTo(0, GRAPH_SIZE/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(UNIT, -5); ctx.lineTo(UNIT, 5);
    ctx.moveTo(-UNIT, -5); ctx.lineTo(-UNIT, 5);
    ctx.moveTo(-5, UNIT); ctx.lineTo(5, UNIT);
    ctx.moveTo(-5, -UNIT); ctx.lineTo(5, -UNIT);
    ctx.stroke();

    ctx.fillStyle = "rgba(52, 152, 219, 0.7)";
    ctx.strokeStyle = "rgba(41, 128, 185, 1)";
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(-R, 0);
    ctx.lineTo(-R, R/2);
    ctx.lineTo(0, R/2);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, 0, Math.PI/2);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(R/2, 0);
    ctx.lineTo(0, -R/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.scale(1, -1);
    ctx.fillStyle = "black";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    
    ctx.fillText("x", R * 1.1, 15);
    ctx.fillText("R", R - 5, 15);
    ctx.fillText("R/2", R/2 - 5, 15);
    ctx.fillText("-R", -R - 5, 15);
    ctx.fillText("-R/2", -R/2 - 5, 15);
    ctx.fillText("1", UNIT, 15);
    ctx.fillText("-1", -UNIT, 15);
    
    ctx.fillText("y", -15, -R * 1.1);
    ctx.fillText("R", -15, -R + 5);
    ctx.fillText("R/2", -15, -R/2 + 5);
    ctx.fillText("-R", -15, R + 5);
    ctx.fillText("-R/2", -15, R/2 + 5);
    ctx.fillText("1", -15, -UNIT + 5);
    ctx.fillText("-1", -15, UNIT + 5);
    
    ctx.fillText(`R = ${currentR}`, 0, -GRAPH_SIZE/2 + 20);
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    drawAllPoints();
};

function updateGraph() {
    const rInput = document.querySelector('input[id*="rInput"]');
    if (rInput && rInput.value) {
        const r = parseFloat(rInput.value);
        
        if (r < CONFIG.R_MIN || r > CONFIG.R_MAX) {
            showRWarning(r);
            return;
        } else {
            hideRWarning();
        }
        
        if (r >= CONFIG.R_MIN && r <= CONFIG.R_MAX) {
            currentR = r;
            initGraph();
            return;
        }
    }
}

function validateYInput() {
    const yInput = document.querySelector('input[id*="yInput"]');
    if (yInput && yInput.value) {
        const y = parseFloat(yInput.value);
        
        if (isNaN(y)) {
            showYWarning("Y должен быть числом");
            return false;
        }
        
        if (y < CONFIG.Y_MIN || y > CONFIG.Y_MAX) {
            showYWarning(`Y должен быть от ${CONFIG.Y_MIN} до ${CONFIG.Y_MAX}`);
            return false;
        }
        
        hideYWarning();
        return true;
    }
    return false;
}

function validateRInput() {
    const rInput = document.querySelector('input[id*="rInput"]');
    if (rInput && rInput.value) {
        const r = parseFloat(rInput.value);

        if (isNaN(r)) {
            showRWarning("R должен быть числом");
            return false;
        }
        
        if (r < CONFIG.R_MIN || r > CONFIG.R_MAX) {
            showRWarning(`R должен быть от ${CONFIG.R_MIN} до ${CONFIG.R_MAX}`);
            return false;
        }
        
        hideRWarning();
        return true;
    }
    return false;
}

function showRWarning(r) {
    hideRWarning();
    
    const rInput = document.querySelector('input[id*="rInput"]');
    if (rInput) {
        const warning = document.createElement('div');
        warning.id = 'r-warning';
        warning.className = 'warning-message';
        warning.style.color = '#e74c3c';
        warning.style.fontSize = '12px';
        warning.style.marginTop = '5px';
        
        if (r < CONFIG.R_MIN) {
            warning.textContent = `Радиус R должен быть не менее ${CONFIG.R_MIN}`;
        } else if (r > CONFIG.R_MAX) {
            warning.textContent = `Радиус R должен быть не более ${CONFIG.R_MAX}`;
        }

        rInput.parentNode.insertBefore(warning, rInput.nextSibling);

        rInput.style.borderColor = '#e74c3c';
    }
}

function hideRWarning() {
    const warning = document.getElementById('r-warning');
    if (warning) {
        warning.remove();
    }
    
    const rInput = document.querySelector('input[id*="rInput"]');
    if (rInput) {
        rInput.style.borderColor = '';
    }
}

function showYWarning(message) {
    hideYWarning();
    
    const yInput = document.querySelector('input[id*="yInput"]');
    if (yInput) {
        const warning = document.createElement('div');
        warning.id = 'y-warning';
        warning.className = 'warning-message';
        warning.style.color = '#e74c3c';
        warning.style.fontSize = '12px';
        warning.style.marginTop = '5px';
        warning.textContent = message;
        
        yInput.parentNode.insertBefore(warning, yInput.nextSibling);

        yInput.style.borderColor = '#e74c3c';
    }
}

function hideYWarning() {
    const warning = document.getElementById('y-warning');
    if (warning) {
        warning.remove();
    }
    
    const yInput = document.querySelector('input[id*="yInput"]');
    if (yInput) {
        yInput.style.borderColor = '';
    }
}

function getSelectedR() {
    const rInput = document.querySelector('input[id*="rInput"]');
    if (rInput && rInput.value) {
        const r = parseFloat(rInput.value);
        if (r >= CONFIG.R_MIN && r <= CONFIG.R_MAX) {
            return r;
        }
    }
    return CONFIG.R_DEFAULT;
}

const handleCanvasClick = (event) => {
    const selectedR = getSelectedR();
    if (!selectedR) {
        alert("Пожалуйста, введите радиус R от 2 до 5 перед кликом на графике");
        return;
    }

    if (selectedR < CONFIG.R_MIN || selectedR > CONFIG.R_MAX) {
        alert(`Радиус R должен быть от ${CONFIG.R_MIN} до ${CONFIG.R_MAX}. Текущее значение: ${selectedR}`);
        return;
    }
    
    const canvas = document.getElementById("graph");
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    const UNIT = 60;
    const cx = CONFIG.GRAPH_SIZE / 2;
    const cy = CONFIG.GRAPH_SIZE / 2;

    const x = (clickX - cx) / UNIT;
    const y = (cy - clickY) / UNIT;
    
    console.log(`Клик по графику: x=${x.toFixed(2)}, y=${y.toFixed(2)}`);
    console.log(`Доступные X значения:`, CONFIG.X_VALUES);
    
    if (x < -5 || x > 3 || y < -5 || y > 3) {
        alert("Точка за пределами допустимой области");
        return;
    }
    

    const clampedY = Math.max(CONFIG.Y_MIN, Math.min(CONFIG.Y_MAX, y));
    const exactX = parseFloat(x.toFixed(2));
    
    let closestX = CONFIG.X_VALUES[0];
    let minDistance = Math.abs(CONFIG.X_VALUES[0] - exactX);

    
    for (let i = 0; i < CONFIG.X_VALUES.length; i++) {
        const val = CONFIG.X_VALUES[i];
        const distance = Math.abs(val - exactX);
        console.log(`  ${val} - расстояние: ${distance.toFixed(3)}`);
        if (distance < minDistance) {
            minDistance = distance;
            closestX = val;
            console.log(`    Новый ближайший: ${val}`);
        }
    }
    
    console.log(`РЕЗУЛЬТАТ: Точный X=${exactX}, ближайший для отображения=${closestX}`);
    
    console.log(`Выбранные координаты: точный x=${exactX}, y=${clampedY.toFixed(2)}, r=${selectedR}`);

    setFormValues(exactX, clampedY, selectedR);

    submitForm();
};

const setFormValues = (exactX, y, r) => {
    console.log(`setFormValues вызвана с точным x=${exactX}, y=${y}, r=${r}`);

    const xDisplay = document.querySelector('input[id*="xDisplay"]');
    if (xDisplay) {
        xDisplay.value = exactX;
        console.log(`Установлен точный X в скрытое поле: ${xDisplay.value}`);
        xDisplay.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('Триггернуто событие change для X');
    } else {
        console.log('Скрытое поле X не найдено');
    }

    const xLinks = document.querySelectorAll('a[class*="x-link"]');
    console.log(`Найдено X commandLink: ${xLinks.length}`);
    
    let closestLink = null;
    let minDistance = Infinity;
    
    for (let link of xLinks) {
        const linkValue = parseFloat(link.textContent.trim());
        const distance = Math.abs(linkValue - exactX);
        console.log(`X link: text="${link.textContent.trim()}", parsed=${linkValue}, расстояние=${distance.toFixed(3)}`);
        if (distance < minDistance) {
            minDistance = distance;
            closestLink = link;
        }
    }
    
    if (closestLink) {
        closestLink.click();
    } else {
        console.log(`err`);
    }

    const yInput = document.querySelector('input[id*="yInput"]');
    if (yInput) {
        yInput.value = y.toFixed(2);
        console.log(`Установлен Y: ${yInput.value}`);
        yInput.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
        console.log('Y input не найден');
    }

    const rInput = document.querySelector('input[id*="rInput"]');
    if (rInput) {
        rInput.value = r.toFixed(2);
        console.log(`Установлен R: ${rInput.value}`);
        rInput.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
        console.log('R input не найден');
    }
};

const submitForm = () => {
    const rValid = validateRInput();
    
    if (!rValid) {
        alert("исправьте ошибки в поле R перед отправкой");
        return;
    }

    const submitButton = document.querySelector('input[value*="Проверить"], button[type="submit"]');
    if (submitButton) {
        submitButton.click();
    } else {
        const form = document.querySelector('form[id*="pointForm"]');
        if (form) {
            form.submit();
        }
    }
};

const loadExistingPoints = () => {
    console.log('loadExistingPoints() вызвана');
    points = [];
    
    const resultsTable = document.querySelector('table.results-table');
    console.log(resultsTable);
    
    if (!resultsTable) {
        console.log('Таблица не найдена');
        const currentR = getSelectedR();
        if (currentR !== null) {
            initGraph();
        }
        return;
    }
    
    const rows = resultsTable.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
            const x = parseFloat(cells[0].textContent.trim());
            const y = parseFloat(cells[1].textContent.trim());
            const r = parseFloat(cells[2].textContent.trim());
            const hitText = cells[3].textContent.trim();
            const hit = hitText === 'Попадание';
            
            console.log('Точка:', { x, y, r, hit });

            if (!isNaN(x) && !isNaN(y) && !isNaN(r)) {
                points.push({ x, y, hit, r });
            }
        }
    });

    initGraph();
};

const clearPoints = () => {
    points = [];
    initGraph();
};

window.graphInitialized = false;
window.eventListenersAdded = false;

document.addEventListener("DOMContentLoaded", () => {
    const rInput = document.querySelector('input[id*="rInput"]');
    if (rInput && !rInput.value) {
        rInput.value = CONFIG.R_DEFAULT;
        currentR = CONFIG.R_DEFAULT;
    }
    
    initializeGraph();
});

function initializeGraph() {
    if (window.graphInitialized) {
        return;
    }
    
    window.graphInitialized = true;
    
    setTimeout(() => {
        initGraph();
        
        const canvas = document.getElementById("graph");
        if (canvas) {
            canvas.addEventListener("click", handleCanvasClick);
        }

        if (!window.eventListenersAdded) {
            addEventListeners();
            window.eventListenersAdded = true;
        }

        loadExistingPoints();
    }, 100);
}

function addEventListeners() {
    const rInput = document.querySelector('input[id*="rInput"]');
    if (rInput) {
        rInput.addEventListener('change', function() {
            validateRInput();
            updateGraph();
        });
        rInput.addEventListener('input', function() {
            validateRInput();
            updateGraph();
        });
    }

    const yInput = document.querySelector('input[id*="yInput"]');
    if (yInput) {
        yInput.addEventListener('change', validateYInput);
        yInput.addEventListener('input', validateYInput);
    }
    
    const clearButton = document.querySelector('input[value*="Очистить"]');
    if (clearButton) {
        clearButton.addEventListener('click', clearPoints);
    }
}

if (typeof jsf !== 'undefined' && jsf.ajax) {
    jsf.ajax.addOnEvent(function(data) {
        console.log('AJAX событие:', data.status);
        if (data.status === 'success') {
            setTimeout(function() {
                loadExistingPoints();
            }, 100);
        }
    });
}