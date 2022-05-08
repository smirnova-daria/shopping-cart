const cartTable = document.querySelector('.cart')
let productRows = document.querySelectorAll('.product')

const deleteProduct = (id) => {
	productRows.forEach(product => {
		if (product.getAttribute('data-product-id') == id) {
			product.remove()
		}
	})
}

const increment = (id) => {
	productRows.forEach(product => {
		if (product.getAttribute('data-product-id') == id) {
			const countInput = product.querySelector('input')
			let count = countInput.value
			count++
			countInput.value = count
		}
	})
}

const decrement = (id) => {
	productRows.forEach(product => {
		if (product.getAttribute('data-product-id') == id) {
			const countInput = product.querySelector('input')
			let count = countInput.value
			count--
			if (count <= 1) {
				count = 1
			}
			countInput.value = count
		}
	})
}

const getSum = (id) => {
	productRows.forEach(product => {
		if (product.getAttribute('data-product-id') == id) {
			const count = product.querySelector('input').value
			let sum = 0
			switch (id) {
				case '1':
					sum = count * 110000
					break;
				case '2':
					sum = count * 29000
					break;
				case '3':
					sum = count * 190000
					break;
			}
			const sumBlock = product.querySelector('.product__price')
			sumBlock.textContent = `${formating(sum)}  руб.`
		}
	})
}

const getTotalSum = () => {
	productRows = document.querySelectorAll('.product')
	const totalQuantityBlock = document.querySelector('.cart-footer__count')
	const totalSumBlock = document.querySelector('.cart-footer__price')
	let totalQuantity = 0
	let totalSum = 0
	productRows.forEach(product => {
		totalQuantity += +product.querySelector('input').value
		totalSum += +product.querySelector('.product__price').textContent.replace(/\D/g, '')
	})
	totalQuantityBlock.textContent = `${totalQuantity} ед.`
	totalSumBlock.textContent = `${formating(totalSum)}  руб.`
}

const formating = (num) => {
	return new Intl.NumberFormat('ru-RU').format(num)
}

cartTable.addEventListener('click', e => {
	const id = e.target.closest('.product').getAttribute('data-product-id')
	if (e.target.closest('.product__delete')) {
		deleteProduct(id)
		getTotalSum()
	}
	if (e.target.closest('.count__up')) {
		increment(id)
		getSum(id)
		getTotalSum()
	}
	if (e.target.closest('.count__down')) {
		decrement(id)
		getSum(id)
		getTotalSum()
	}
	return
})

cartTable.addEventListener('change', e => {
	if (e.target.closest('.count__box')) {
		if (e.target.value < 1) {
			e.target.value = 1
		}
		const id = e.target.closest('.product').getAttribute('data-product-id')
		getSum(id)
		getTotalSum()
	}
	return
})