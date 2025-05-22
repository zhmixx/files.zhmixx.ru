        let score = 0;
        let xp = 0;
        let clickValue = 1;
        let autoClickerEnabled = false;
        let autoClickerSpeed = 0.5;
        let upgradeCount = 0;
        let comboCount = 0;
        let comboBonus = 1;
        let rebirthLevel = 0;
        let rebirthBonus = 0;
        let clickUpgradeBaseCost = 100;
        let clickUpgradeCost = clickUpgradeBaseCost;
        let autoClickerBaseCost = 500;
        let autoClickerCost = autoClickerBaseCost;
        let autoClickerUpgradeBaseCost = 300;
        let autoClickerUpgradeCost = autoClickerUpgradeBaseCost;
        let autoClickerInterval;
        let comboTimeout;

        const pets = [
            { level: 0, name: "нет", bonus: 0 },
            { level: 1, name: "котёнок", bonus: 5 },
            { level: 2, name: "собака", bonus: 10 },
            { level: 3, name: "попугай", bonus: 15 },
            { level: 4, name: "кролик", bonus: 20 },
            { level: 5, name: "лиса", bonus: 25 },
            { level: 6, name: "волк", bonus: 30 },
            { level: 7, name: "тигр", bonus: 35 },
            { level: 8, name: "панда", bonus: 40 },
            { level: 9, name: "обезьяна", bonus: 45 },
            { level: 10, name: "дракон", bonus: 50 },
            { level: 11, name: "феникс", bonus: 60 },
            { level: 12, name: "единорог", bonus: 70 },
            { level: 13, name: "грифон", bonus: 80 },
            { level: 14, name: "кит", bonus: 90 },
            { level: 15, name: "сфинкс", bonus: 100 },
            { level: 16, name: "пегас", bonus: 120 },
            { level: 17, name: "химера", bonus: 140 },
            { level: 18, name: "башни", bonus: 160 },
            { level: 19, name: "левиафан", bonus: 180 },
            { level: 20, name: "бог", bonus: 200 },
            { level: 21, name: "вселенная", bonus: 250 },
			{ level: 800, name: "admin_pet", bonus: 9999 }
        ];

        let sectionStates = JSON.parse(localStorage.getItem("sectionStates")) || {
            upgradesSection: true,
            rebirthSection: true,
            achievementsSection: false,
            saveLoadSection: true
        };

        function updateDisplay() {
            document.getElementById("scoreValue").innerText = Math.floor(score);
            document.getElementById("xpValue").innerText = Math.floor(xp);
            document.getElementById("clickValue").innerText = "каждый клик приносит: " + clickValue;
            document.getElementById("autoClickerStatus").innerText = "автокликер: " + (autoClickerEnabled ? "включен" : "выключен");
            document.getElementById("rebirthLevel").innerText = rebirthLevel;
            document.getElementById("rebirthBonus").innerText = rebirthBonus + "%";
            document.getElementById("clickUpgradeCost").innerText = Math.floor(clickUpgradeCost);
            document.getElementById("autoClickerCost").innerText = Math.floor(autoClickerCost);
            document.getElementById("autoClickerUpgradeCost").innerText = Math.floor(autoClickerUpgradeCost);
            document.getElementById("comboBonus").innerText = comboBonus;
            document.getElementById("petBonus").innerText = "текущий питомец: " + pets[rebirthLevel].name + " (бонус: " + pets[rebirthLevel].bonus + "%)";
            checkAchievements();
            updateSections();
        }

        function updateSections() {
            for (let id in sectionStates) {
                const section = document.getElementById(id);
                section.classList.toggle("collapsed", !sectionStates[id]);
                const header = section.querySelector("h2");
                if (header) header.classList.toggle("collapsed", !sectionStates[id]);
            }
        }

        function toggleSection(id) {
            sectionStates[id] = !sectionStates[id];
            localStorage.setItem("sectionStates", JSON.stringify(sectionStates));
            updateSections();
        }

        function showEffect(x, y, text) {
            const effect = document.createElement("div");
            effect.className = "effect";
            effect.style.left = x + "px";
            effect.style.top = y + "px";
            effect.innerText = "+" + text;
            document.body.appendChild(effect);
            setTimeout(() => effect.remove(), 1000);
        }

        function resetCombo() {
            comboCount = 0;
            comboBonus = 1;
            updateDisplay();
        }

        function clickCat() {
            const rect = document.getElementById("cat").getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            score += clickValue * (1 + rebirthBonus / 100) * comboBonus;
            xp += 1 * (1 + rebirthBonus / 100);
            comboCount++;
            clearTimeout(comboTimeout);
            comboTimeout = setTimeout(resetCombo, 10000);

            if (comboCount % 10 === 0) {
                comboBonus += 0.1;
                showEffect(x, y, "комбо бонус: " + comboBonus + "x");
            }

            updateDisplay();
            showEffect(x, y, Math.floor(clickValue * (1 + rebirthBonus / 100) * comboBonus));
        }

        function buyClickUpgrade() {
            if (score >= clickUpgradeCost) {
                score -= clickUpgradeCost;
                clickValue += 5 * (1 + rebirthBonus / 100);
                upgradeCount++;
                clickUpgradeCost *= 2;
                if (clickUpgradeCost > 10000 * (rebirthLevel + 1)) clickUpgradeCost = 10000 * (rebirthLevel + 1);
                updateDisplay();
            } else {
                alert("недостаточно денег!");
            }
        }

        function buyAutoClicker() {
            if (score >= autoClickerCost && !autoClickerEnabled) {
                score -= autoClickerCost;
                autoClickerEnabled = true;
                document.getElementById("autoClickerStatus").innerText = "автокликер: включен";
                autoClickerInterval = setInterval(autoClick, 2000 / autoClickerSpeed);
                autoClickerCost *= 2;
                if (autoClickerCost > 50000 * (rebirthLevel + 1)) autoClickerCost = 50000 * (rebirthLevel + 1);
                updateDisplay();
            } else if (autoClickerEnabled) {
                alert("автокликер уже куплен!");
            } else {
                alert("недостаточно денег!");
            }
        }

        function upgradeAutoClicker() {
            if (score >= autoClickerUpgradeCost && autoClickerEnabled) {
                score -= autoClickerUpgradeCost;
                autoClickerSpeed += 0.25;
                clearInterval(autoClickerInterval);
                autoClickerInterval = setInterval(autoClick, 2000 / autoClickerSpeed);
                autoClickerUpgradeCost *= 2;
                if (autoClickerUpgradeCost > 20000 * (rebirthLevel + 1)) autoClickerUpgradeCost = 20000 * (rebirthLevel + 1);
                updateDisplay();
            } else {
                alert("автокликер не куплен или недостаточно денег!");
            }
        }

        function autoClick() {
            score += clickValue * 0.5 * (1 + rebirthBonus / 100);
            xp += 0.25 * (1 + rebirthBonus / 100);
            updateDisplay();
        }

        function checkAchievements() {
            if (score >= 80000) document.getElementById("achievement1").innerText = "миллионер: разблокировано!";
            if (upgradeCount >= 5) document.getElementById("achievement2").innerText = "мастер улучшений: разблокировано!";
            if (rebirthLevel >= 1) document.getElementById("achievement3").innerText = "новое начало: разблокировано!";
            if (comboBonus >= 2) document.getElementById("achievement4").innerText = "король комбо: разблокировано!";
            if (xp >= 10000) document.getElementById("achievement5").innerText = "ветеран: разблокировано!";
            if (autoClickerSpeed >= 2) document.getElementById("achievement6").innerText = "автоматизатор: разблокировано!";
        }

        function rebirth() {
            if (score >= 80000) {
                score = 0;
                xp = 0;
                clickValue = 1 + (rebirthLevel * 0.5);
                autoClickerEnabled = false;
                autoClickerSpeed = 0.5;
                upgradeCount = 0;
                comboCount = 0;
                comboBonus = 1;
                rebirthLevel++;
                rebirthBonus = rebirthLevel * 10;
                clickUpgradeCost = clickUpgradeBaseCost;
                autoClickerCost = autoClickerBaseCost;
                autoClickerUpgradeCost = autoClickerUpgradeBaseCost;
                clearInterval(autoClickerInterval);
                document.getElementById("autoClickerStatus").innerText = "автокликер: выключен";
                updateDisplay();
                alert("вы переродились! новый уровень: " + rebirthLevel + " с бонусом " + rebirthBonus + "%!");
            } else {
                alert("нужно 80000 денег для перерождения!");
            }
        }

        function saveGame() {
            const gameData = {
                score, xp, clickValue, autoClickerEnabled, autoClickerSpeed, upgradeCount, comboCount, comboBonus, rebirthLevel, rebirthBonus,
                clickUpgradeCost, autoClickerCost, autoClickerUpgradeCost, sectionStates
            };
            localStorage.setItem("clickerSave", JSON.stringify(gameData));
            alert("игра сохранена локально!");
        }

        function exportSave() {
            const gameData = {
                score, xp, clickValue, autoClickerEnabled, autoClickerSpeed, upgradeCount, comboCount, comboBonus, rebirthLevel, rebirthBonus,
                clickUpgradeCost, autoClickerCost, autoClickerUpgradeCost, sectionStates
            };
            let obfuscated = btoa(JSON.stringify(gameData));
            const blob = new Blob([obfuscated], { type: "application/json" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "clicker_save.json";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            alert("сохранение экспортировано!");
        }

        function importSave() {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".json";
            input.onchange = e => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        let obfuscated = e.target.result;
                        let decoded = atob(obfuscated);
                        const savedData = JSON.parse(decoded);
                        score = savedData.score || 0;
                        xp = savedData.xp || 0;
                        clickValue = savedData.clickValue || 1;
                        autoClickerEnabled = savedData.autoClickerEnabled || false;
                        autoClickerSpeed = savedData.autoClickerSpeed || 0.5;
                        upgradeCount = savedData.upgradeCount || 0;
                        comboCount = savedData.comboCount || 0;
                        comboBonus = savedData.comboBonus || 1;
                        rebirthLevel = savedData.rebirthLevel || 0;
                        rebirthBonus = savedData.rebirthBonus || 0;
                        clickUpgradeCost = savedData.clickUpgradeCost || clickUpgradeBaseCost;
                        autoClickerCost = savedData.autoClickerCost || autoClickerBaseCost;
                        autoClickerUpgradeCost = savedData.autoClickerUpgradeCost || autoClickerUpgradeBaseCost;
                        sectionStates = savedData.sectionStates || sectionStates;

                        updateDisplay();
                        if (autoClickerEnabled) {
                            clearInterval(autoClickerInterval);
                            autoClickerInterval = setInterval(autoClick, 2000 / autoClickerSpeed);
                            document.getElementById("autoClickerStatus").innerText = "автокликер: включен";
                        }
                        localStorage.setItem("sectionStates", JSON.stringify(sectionStates));
                        alert("игра импортирована!");
                    } catch (error) {
                        alert("ошибка импорта: файл повреждён или неверный формат!");
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        }

        function resetGame() {
            if (confirm("вы уверены, что хотите сбросить игру?")) {
                localStorage.removeItem("clickerSave");
                localStorage.removeItem("sectionStates");
                location.reload();
            }
        }

        window.onload = function () {
            loadGame();
            updateDisplay();
        };

        function loadGame() {
            const savedData = JSON.parse(localStorage.getItem("clickerSave"));
            if (savedData) {
                score = savedData.score || 0;
                xp = savedData.xp || 0;
                clickValue = savedData.clickValue || 1;
                autoClickerEnabled = savedData.autoClickerEnabled || false;
                autoClickerSpeed = savedData.autoClickerSpeed || 0.5;
                upgradeCount = savedData.upgradeCount || 0;
                comboCount = savedData.comboCount || 0;
                comboBonus = savedData.comboBonus || 1;
                rebirthLevel = savedData.rebirthLevel || 0;
                rebirthBonus = savedData.rebirthBonus || 0;
                clickUpgradeCost = savedData.clickUpgradeCost || clickUpgradeBaseCost;
                autoClickerCost = savedData.autoClickerCost || autoClickerBaseCost;
                autoClickerUpgradeCost = savedData.autoClickerUpgradeCost || autoClickerUpgradeBaseCost;
                sectionStates = savedData.sectionStates || sectionStates;

                updateDisplay();
                if (autoClickerEnabled) {
                    clearInterval(autoClickerInterval);
                    autoClickerInterval = setInterval(autoClick, 2000 / autoClickerSpeed);
                    document.getElementById("autoClickerStatus").innerText = "автокликер: включен";
                }
                localStorage.setItem("sectionStates", JSON.stringify(sectionStates));
                alert("игра загружена!");
            } else {
                alert("сохранение не найдено.");
            }
        }