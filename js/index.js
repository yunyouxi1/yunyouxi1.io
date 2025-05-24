// 商品数据生成器
function generateProducts() {
	const products = [];
	const combinationMap = new Map();
	//王者荣耀卡片
	products.push({
		id: "wzry-001",
		game: "王者荣耀",
		category: "小国标",
		title: "王者荣耀 1万1武则天万战姜子牙小国标质量皮肤账号001",
		price: 1088,
		introduction: "小国武则天，小国姜子牙，多省标",
		shard: "QQ",
		system: "安卓",
	});


	products.push({
		id: "wzry-002",
		game: "王者荣耀",
		//类型
		category: "小国标",
		//名称
		title: "王者荣耀 1点3小国标鬼谷嫦娥省标质量皮肤账号002",    
		//价格
		price: 888,
		//简介
		introduction: "小国服嫦娥，省标嫦娥",
		//区服
		shard: "QQ",
		//系统
		system: "安卓",
	});



	//王者荣耀卡片
	products.push({
		id: "wzry-003",
		game: "王者荣耀",
		category: "大国标",
		title: "王者荣耀 1万9司空震大国标003",
		price: 3888,
		introduction: "1万9大国司空震高数据有魔方",
		shard: "QQ",
		system: "iOS",
	});
	//王者荣耀卡片
	products.push({
		id: "wzry-004",
		game: "王者荣耀",
		category: "省标",
		title: "王者荣耀 小国标004",
		price: 100,
		introduction: "广东",
		shard: "QQ",
		system: "安卓",
	});
	//王者荣耀卡片
	products.push({
		id: "wzry-005",
		game: "王者荣耀",
		category: "省标",
		title: "王者荣耀 小国标005",
		price: 100,
		introduction: "小国标老虎",
		shard: "QQ",
		system: "安卓",
	});
               

	return products;
}


// 商品卡片模板
function createProductCard(product) {
	const card = document.createElement('div');
	card.className = 'account-card';
	card.dataset.game = product.game;
	card.dataset.category = product.category;

	card.innerHTML = `
                <a href="${product.id}.html?id=${product.id}" class="card-link" target="_blank">
                    <div class="image-container">
                        <img src="img/${product.id}/${product.id}.jpg" class="cover-image" alt="${product.title}" loading="lazy">
                    </div>
                    <div class="game-header">
                        <img src="images/${product.game}.jpg" class="game-icon" alt="${product.game}">
                        <div>
                            <h3>${product.title}</h3>
                            <div class="price-tag">¥${product.price}</div>
                        </div>
                    </div>
                    <ul>
                        <li>区服: ${product.shard}</li>
                        <li>系统: ${product.system}</li>
                        <li>简介: ${product.introduction}</li>
                    </ul>
                </a>
            `;
	return card;
}

// 初始化商品
const productGrid = document.getElementById('productGrid');
const products = generateProducts();
products.forEach(product => {
	productGrid.appendChild(createProductCard(product));
});

// 筛选功能
let currentGame = 'all';
let currentCategory = 'all';

document.querySelectorAll('.filter-btn').forEach(btn => {
	btn.addEventListener('click', function () {
		const type = this.dataset.type;
		const value = this.dataset.value;

		// 更新筛选状态
		document.querySelectorAll(`[data-type="${type}"]`).forEach(b => {
			b.classList.remove('active');
		});
		this.classList.add('active');

		// 设置当前筛选条件
		if (type === 'game') currentGame = value;
		if (type === 'category') currentCategory = value;

		// 执行筛选
		filterProducts();
	});
});

function filterProducts() {
	const cards = document.querySelectorAll('.account-card');
	let visibleCount = 0;

	cards.forEach(card => {
		const gameMatch = currentGame === 'all' || card.dataset.game === currentGame;
		const categoryMatch = currentCategory === 'all' || card.dataset.category === currentCategory;
		const shouldShow = gameMatch && categoryMatch;

		card.style.display = shouldShow ? 'block' : 'none';
		if (shouldShow) visibleCount++;
	});

	// 自动调整布局
	productGrid.style.gridTemplateColumns = visibleCount === 0 ? '1fr' : `repeat(auto-fill, minmax(300px, 1fr))`;
}

// 初始化筛选
filterProducts();
