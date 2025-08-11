import { useState } from 'react';
import styles from './App.module.css';
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// console.log(steps.at(activeIndex)['content']);
	const cardContent = steps.at(activeIndex)['content'];

	// console.log(steps);
	// console.log(activeIndex);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const backButtonClick = () => {
		// setSteps(steps + 1);
		setActiveIndex(activeIndex - 1);
	};

	const forwardButtonClick = () => {
		if (activeIndex < 6) {
			// setSteps(steps + 1);
			setActiveIndex(activeIndex + 1);
		} else if (activeIndex == 6) {
			// setSteps(steps);
			setActiveIndex(activeIndex - 6);
		}
	};

	const forwardButton = (
		<button className={styles.button} onClick={forwardButtonClick}>
			Далее
		</button>
	);
	const againButton = (
		<button className={styles.button} onClick={forwardButtonClick}>
			Начать с начала
		</button>
	);

	const backButton = (
		<button className={styles.button} onClick={backButtonClick}>
			Назад
		</button>
	);

	const backButtonDisabled = (
		<button className={styles.button} onClick={backButtonClick} disabled>
			Назад
		</button>
	);

	let isForwardButton;
	if (activeIndex < 6) {
		isForwardButton = true;
	} else {
		isForwardButton = false;
	}

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let isFirstStepActive;
	if (activeIndex == 0) {
		isFirstStepActive = true;
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{cardContent}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ title, id }, index) => {
							return (
								<li
									key={id}
									className={
										styles['steps-item'] +
										(index === activeIndex ? ' ' + `${styles.active}` : '') +
										(index < activeIndex ? ' ' + `${styles.done}` : '')
									}
								>
									<button className={styles['steps-item-button']} onClick={() => setActiveIndex(index)}>
										{index}
									</button>
									{title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						{isFirstStepActive ? backButtonDisabled : backButton}
						{isForwardButton ? forwardButton : againButton}
					</div>
				</div>
			</div>
		</div>
	);
};

// /* <button className={styles.button} onClick={forwardButton}>
// 							{textForwardButton ? 'Далее' : 'Начать с начала'}
// 							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
// 							{/* Или заменять всю кнопку в зависимости от условия */}
// 							</button> */

// {/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
// 						{/* {steps.map(li)} */}
// 						<li className={styles['steps-item'] + ' ' + styles.done}>
// 							{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
// 							<button className={styles['steps-item-button']}>1</button>
// 							{/* При клике на кнопку установка выбранного шага в качестве активного */}
// 							Шаг 1
// 						</li>
// 						<li className={styles['steps-item'] + ' ' + styles.done}>
// 							<button className={styles['steps-item-button']}>2</button>
// 							Шаг 2
// 						</li>
// 						<li className={styles['steps-item'] + ' ' + styles.done + ' ' + styles.active}>
// 							<button className={styles['steps-item-button']}>3</button>
// 							Шаг 3
// 						</li>
// 						<li className={styles['steps-item']}>
// 							<button className={styles['steps-item-button']}>4</button>
// 							Шаг 4
// 						</li>
