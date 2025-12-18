  const segments = [
            { value: 'Good fortune until summer...', color: '#720000ff', textColor: '#fff' },
            { value: 'Tensions with friends', color: '#3b5774ff', textColor: '#fff' },
            { value: 'Not much...', color: '#4e4e4eff', textColor: '#000' },
            { value: 'suspicious giftings', color: '#7b1fa2', textColor: '#fff' },
            { value: 'A warm winter?', color: '#388e3c', textColor: '#fff' },
            { value: 'Many blessings!', color: '#b1a500ff', textColor: '#000' },
            { value: 'Closer bonding with family', color: '#fb8affff', textColor: '#fff' },
            { value: 'Winter of Working', color: '#a6d2ffff', textColor: '#fff' },
            { value: 'Better fate once winter ends', color: '#d32f2f', textColor: '#fff' },
            { value: 'fair winter, but you can reroll', color: '#388e3c', textColor: '#fff' },
            { value: 'A peaceful winter', color: '#6095b4ff', textColor: '#000' },
            { value: 'DEATH', color: '#1a1a1a', textColor: '#fff' }
        ];

        const canvas = document.getElementById('wheelCanvas');
        const ctx = canvas.getContext('2d');
        const wheel = document.getElementById('wheel');
        const spinButton = document.getElementById('spinButton');
        const resultContainer = document.getElementById('resultContainer');
        const resultValue = document.getElementById('resultValue');

        let currentRotation = 0;
        let isSpinning = false;

        function drawWheel() {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 250;
            const segmentAngle = (2 * Math.PI) / segments.length;

            segments.forEach((segment, i) => {
                const startAngle = i * segmentAngle - Math.PI / 2;
                const endAngle = startAngle + segmentAngle;

                // Draw gradient segment
                const gradient = ctx.createLinearGradient(
                    centerX + Math.cos(startAngle) * radius,
                    centerY + Math.sin(startAngle) * radius,
                    centerX + Math.cos(endAngle) * radius,
                    centerY + Math.sin(endAngle) * radius
                );
                gradient.addColorStop(0, segment.color);
                gradient.addColorStop(1, segment.color + 'CC');

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.lineTo(centerX, centerY);
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw text
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(startAngle + segmentAngle / 2);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = segment.textColor;
                ctx.font = 'bold 18px Arial';
                ctx.shadowColor = 'rgba(0,0,0,0.8)';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.fillText(segment.value, 170, 0);
                ctx.restore();
            });

            // Draw center hub
            const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
            centerGradient.addColorStop(0, '#4a4a4a');
            centerGradient.addColorStop(1, '#1a1a1a');

            ctx.beginPath();
            ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
            ctx.fillStyle = '#1a1a1a';
            ctx.fill();
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
            ctx.fillStyle = centerGradient;
            ctx.fill();
        }

        function spinWheel() {
            if (isSpinning) return;

            isSpinning = true;
            spinButton.disabled = true;
            spinButton.textContent = 'SPINNING...';
            resultContainer.classList.remove('show');

            const minSpins = 5;
            const extraRotation = Math.random() * 360;
            const totalRotation = (minSpins * 360) + extraRotation;
            const newRotation = currentRotation + totalRotation;

            wheel.style.transform = `rotate(${newRotation}deg)`;
            currentRotation = newRotation;

            setTimeout(() => {
                isSpinning = false;
                spinButton.disabled = false;
                spinButton.textContent = 'SPIN THE WHEEL';

                const normalizedRotation = newRotation % 360;
                const segmentAngle = 360 / segments.length;
                const selectedIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length;
                
                resultValue.textContent = segments[selectedIndex].value;
                resultContainer.classList.add('show');
            }, 4000);
        }

        spinButton.addEventListener('click', spinWheel);

        // Draw the wheel on load
        drawWheel();