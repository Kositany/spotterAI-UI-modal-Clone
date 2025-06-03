// hamburger
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
const navLinks = nav.querySelectorAll('a');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    if (
        !nav.contains(event.target) &&
        !hamburger.contains(event.target) &&
        nav.classList.contains('active')
    ) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // Data for the chart
    const days = [0, 7, 30, 90, 180, 365];
    const spotterData = [99, 99, 98, 97, 96, 95];
    const othersData = [98, 85, 70, 50, 30, 15];

    // Chart dimensions
    const width = 800;
    const height = 300;
    const margin = { top: 20, right: 60, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG element
    const svg = document.getElementById('accuracyChart');
    svg.innerHTML = '';

    // Create main group
    const chartGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    chartGroup.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);
    svg.appendChild(chartGroup);

    // Create scales
    const xScale = (day) => {
        const maxDay = Math.max(...days);
        return margin.left + (day / maxDay) * innerWidth;
    };

    const yScale = (value) => {
        return innerHeight - (value / 100) * innerHeight;
    };

    // Draw grid lines
    for (let i = 0; i <= 100; i += 25) {
        const y = yScale(i);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', margin.left);
        line.setAttribute('y1', y);
        line.setAttribute('x2', width - margin.right);
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.05)');
        line.setAttribute('stroke-width', '1');
        chartGroup.appendChild(line);

        // Add grid label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', margin.left - 10);
        text.setAttribute('y', y + 4);
        text.setAttribute('text-anchor', 'end');
        text.setAttribute('fill', 'var(--neutral-80)');
        text.setAttribute('font-size', '12');
        text.textContent = `${i}%`;
        chartGroup.appendChild(text);
    }

    // Draw x-axis labels
    const timeLabels = ['Initial', '1 Week', '1 Month', '3 Months', '6 Months', '1 Year'];
    days.forEach((day, i) => {
        const x = xScale(day);
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', innerHeight + 40);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'var(--neutral-80)');
        text.setAttribute('font-size', '12');
        text.textContent = timeLabels[i];
        chartGroup.appendChild(text);

        // Add vertical line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', margin.top);
        line.setAttribute('x2', x);
        line.setAttribute('y2', innerHeight);
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.05)');
        line.setAttribute('stroke-width', '1');
        chartGroup.appendChild(line);
    });

    // Draw Spotter line
    const spotterLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let spotterPath = `M ${xScale(days[0])} ${yScale(spotterData[0])} `;
    for (let i = 1; i < days.length; i++) {
        spotterPath += `L ${xScale(days[i])} ${yScale(spotterData[i])} `;
    }
    spotterLine.setAttribute('d', spotterPath);
    spotterLine.setAttribute('stroke', 'var(--accent)');
    spotterLine.setAttribute('stroke-width', '3');
    spotterLine.setAttribute('fill', 'none');
    spotterLine.setAttribute('class', 'spotter-line');
    chartGroup.appendChild(spotterLine);

    // Draw Others line
    const othersLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let othersPath = `M ${xScale(days[0])} ${yScale(othersData[0])} `;
    for (let i = 1; i < days.length; i++) {
        othersPath += `L ${xScale(days[i])} ${yScale(othersData[i])} `;
    }
    othersLine.setAttribute('d', othersPath);
    othersLine.setAttribute('stroke', 'var(--neutral-60)');
    othersLine.setAttribute('stroke-width', '3');
    othersLine.setAttribute('fill', 'none');
    othersLine.setAttribute('class', 'others-line');
    chartGroup.appendChild(othersLine);

    // Draw Spotter dots
    days.forEach((day, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', xScale(day));
        circle.setAttribute('cy', yScale(spotterData[i]));
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', 'var(--accent)');
        circle.setAttribute('class', 'data-point');
        circle.setAttribute('data-type', 'spotter');
        circle.setAttribute('data-day', day);
        circle.setAttribute('data-value', spotterData[i]);
        chartGroup.appendChild(circle);

        // Add glow effect
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', xScale(day));
        glow.setAttribute('cy', yScale(spotterData[i]));
        glow.setAttribute('r', '7');
        glow.setAttribute('fill', 'none');
        glow.setAttribute('stroke', 'var(--accent)');
        glow.setAttribute('stroke-width', '1');
        glow.setAttribute('opacity', '0.6');
        chartGroup.appendChild(glow);
    });

    // Draw Others dots
    days.forEach((day, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', xScale(day));
        circle.setAttribute('cy', yScale(othersData[i]));
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', 'var(--neutral-60)');
        circle.setAttribute('class', 'data-point');
        circle.setAttribute('data-type', 'others');
        circle.setAttribute('data-day', day);
        circle.setAttribute('data-value', othersData[i]);
        chartGroup.appendChild(circle);

        // Add glow effect
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', xScale(day));
        glow.setAttribute('cy', yScale(othersData[i]));
        glow.setAttribute('r', '7');
        glow.setAttribute('fill', 'none');
        glow.setAttribute('stroke', 'var(--neutral-60)');
        glow.setAttribute('stroke-width', '1');
        glow.setAttribute('opacity', '0.6');
        chartGroup.appendChild(glow);
    });

    // Add Spotter accuracy label
    const spotterLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    spotterLabel.setAttribute('x', xScale(365) + 15);
    spotterLabel.setAttribute('y', yScale(95) - 5);
    spotterLabel.setAttribute('fill', 'var(--accent)');
    spotterLabel.setAttribute('font-size', '14');
    spotterLabel.setAttribute('font-weight', 'bold');
    spotterLabel.textContent = 'Spotter';
    chartGroup.appendChild(spotterLabel);

    // Add Others accuracy label
    const othersLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    othersLabel.setAttribute('x', xScale(365) + 15);
    othersLabel.setAttribute('y', yScale(15) - 5);
    othersLabel.setAttribute('fill', 'var(--accent-alt)');
    othersLabel.setAttribute('font-size', '14');
    othersLabel.setAttribute('font-weight', 'bold');
    othersLabel.textContent = 'Others';
    chartGroup.appendChild(othersLabel);



    // Legend interactivity
    const spotterLegend = document.getElementById('spotterLegend');
    const othersLegend = document.getElementById('othersLegend');

    spotterLegend.addEventListener('click', () => {
        spotterLegend.classList.toggle('inactive');
        document.querySelector('.spotter-line').classList.toggle('inactive');
        document.querySelectorAll('.data-point[data-type="spotter"]').forEach(p => {
            p.classList.toggle('inactive');
        });
    });

    othersLegend.addEventListener('click', () => {
        othersLegend.classList.toggle('inactive');
        document.querySelector('.others-line').classList.toggle('inactive');
        document.querySelectorAll('.data-point[data-type="others"]').forEach(p => {
            p.classList.toggle('inactive');
        });
    });
});

// magnifier
const magnifier = document.querySelector('.magnifier');
const image = document.querySelector('.magnify-area img');

document.querySelector('.magnify-area').addEventListener('mousemove', function (e) {
    const bounds = this.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    // Show magnifier
    magnifier.style.display = 'block';
    magnifier.style.left = `${x - 50}px`;
    magnifier.style.top = `${y - 50}px`;

});

document.querySelector('.magnify-area').addEventListener('mouseleave', function () {
    magnifier.style.display = 'none';
});
