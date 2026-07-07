import PocketBase from 'pocketbase';

const pb = new PocketBase('http://195.35.22.110:8090');

async function run() {
    await pb.admins.authWithPassword('admin@craftconnect.com', 'Password123!');
    console.log('Authenticated as admin.');

    // 1. Update Users Collection
    const users = await pb.collections.getOne('users');
    const existingUserFields = users.fields || users.schema;
    if (!existingUserFields.find(f => f.name === 'role')) {
        existingUserFields.push({ name: 'role', type: 'select', maxSelect: 1, values: ['ADMIN', 'ARTISAN', 'CUSTOMER'], required: false });
        existingUserFields.push({ name: 'profileImage', type: 'file', maxSelect: 1, required: false });
        existingUserFields.push({ name: 'coverImage', type: 'file', maxSelect: 1, required: false });
        existingUserFields.push({ name: 'bio', type: 'text', required: false });
        existingUserFields.push({ name: 'location', type: 'text', required: false });
    }
    await pb.collections.update('users', { 
        fields: existingUserFields,
        listRule: "",
        viewRule: ""
    });
    console.log('Users collection updated.');

    // 2. Update Products Collection
    const products = await pb.collections.getOne('products');
    const existingProductFields = products.fields || products.schema;
    if (!existingProductFields.find(f => f.name === 'stock')) {
        existingProductFields.push({ name: 'stock', type: 'number', required: false });
        existingProductFields.push({ name: 'imageUrl', type: 'url', required: false });
        existingProductFields.push({ name: 'category', type: 'text', required: false });
        existingProductFields.push({ name: 'artisan', type: 'relation', collectionId: users.id, maxSelect: 1, required: false });
    }
    await pb.collections.update('products', { 
        fields: existingProductFields,
        listRule: "",
        viewRule: ""
    });
    console.log('Products collection updated.');

    // 3. Create Orders Collection
    try {
        await pb.collections.getOne('orders');
    } catch {
        await pb.collections.create({
            name: 'orders',
            type: 'base',
            fields: [
                { name: 'id', type: 'text', primaryKey: true, required: true, system: true, autogeneratePattern: '[a-z0-9]{15}' },
                { name: 'totalAmount', type: 'number', required: true },
                { name: 'status', type: 'select', maxSelect: 1, values: ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'], required: true },
                { name: 'customer', type: 'relation', collectionId: users.id, maxSelect: 1, required: true }
            ]
        });
        console.log('Orders collection created.');
    }

    // 4. Create OrderItems Collection
    const orders = await pb.collections.getOne('orders');
    try {
        await pb.collections.getOne('orderItems');
    } catch {
        await pb.collections.create({
            name: 'orderItems',
            type: 'base',
            fields: [
                { name: 'id', type: 'text', primaryKey: true, required: true, system: true, autogeneratePattern: '[a-z0-9]{15}' },
                { name: 'order', type: 'relation', collectionId: orders.id, maxSelect: 1, required: true },
                { name: 'product', type: 'relation', collectionId: products.id, maxSelect: 1, required: true },
                { name: 'quantity', type: 'number', required: true },
                { name: 'price', type: 'number', required: true }
            ]
        });
        console.log('OrderItems collection created.');
    }

    // 5. SEED DATA
    console.log('Seeding data...');

    const getOrCreate = async (email, data) => {
        try {
            return await pb.collection('users').create({ ...data, email, password: 'Password123!', passwordConfirm: 'Password123!' });
        } catch {
            return await pb.collection('users').getFirstListItem(`email="${email}"`);
        }
    };

    const artisan1 = await getOrCreate('artisan@craftconnect.com', { name: 'Ghulam Nabi', role: 'ARTISAN', bio: 'Master woodcarver with 40+ years of experience.', location: 'Srinagar, J&K' });
    const artisan2 = await getOrCreate('zafar@craftconnect.com',   { name: 'Zafar Ali',    role: 'ARTISAN', bio: 'Papier-Mâché artist, 18th-century family lineage.', location: 'Anantnag, J&K' });
    const artisan3 = await getOrCreate('tariq@craftconnect.com',   { name: 'Tariq Khan',   role: 'ARTISAN', bio: 'Specialist in Kashmiri copper and brass engraving.', location: 'Baramulla, J&K' });
    const customer1 = await getOrCreate('customer@craftconnect.com', { name: 'Priya Sharma', role: 'CUSTOMER', location: 'Delhi' });
    const customer2 = await getOrCreate('rahul@craftconnect.com',    { name: 'Rahul Mehta',  role: 'CUSTOMER', location: 'Mumbai' });
    console.log('Users seeded.');

    const createProduct = async (data) => pb.collection('products').create(data);

    const productDefs = [
        { title: 'Hand-Carved Walnut Table',         description: 'Solid walnut with intricate Chinar leaf motifs, naturally wax-polished.',         price: 450, stock: 3,  category: 'Furniture',   artisan: artisan1.id, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
        { title: 'Walnut Wood Carved Box',           description: 'Intricate relief carving from Kashmir walnut wood.',                                price: 120, stock: 10, category: 'Decor',       artisan: artisan1.id, imageUrl: 'https://images.unsplash.com/photo-1609726494499-27d3e942456c?w=600&q=80' },
        { title: 'Kashmiri Walnut Bookshelf',        description: 'Hand-carved bookshelf with floral border inlays.',                                  price: 680, stock: 2,  category: 'Furniture',   artisan: artisan1.id, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
        { title: 'Vibrant Papier-Mâché Vase',       description: 'Traditional Naqashi floral patterns with real gold accents and natural dyes.',      price: 120, stock: 8,  category: 'Decor',       artisan: artisan2.id, imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80' },
        { title: 'Papier-Mâché Jewellery Box',      description: 'Hand-painted box with Mughal garden motifs.',                                       price:  95, stock: 15, category: 'Decor',       artisan: artisan2.id, imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80' },
        { title: 'Traditional Kashmiri Hookah Base', description: 'Hand-engraved brass with geometric Islamic art patterns.',                          price: 280, stock: 4,  category: 'Decor',       artisan: artisan3.id, imageUrl: 'https://images.unsplash.com/photo-1506905925-346a3b98b2e5?w=600&q=80' },
        { title: 'Engraved Copper Samovar',          description: 'Classic Kashmiri tea urn with hand-hammered floral engravings.',                    price: 320, stock: 3,  category: 'Kitchenware', artisan: artisan3.id, imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&q=80' },
        { title: 'Authentic Pashmina Shawl',         description: 'Ultra-soft 100% Cashmere, handloom woven, dyed with natural pigments.',            price: 350, stock: 5,  category: 'Clothing',    artisan: artisan1.id, imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80' },
        { title: 'Handwoven Kani Pashmina Shawl',    description: 'Kani weave with traditional twill tapestry technique, 6 months to make.',         price: 580, stock: 2,  category: 'Clothing',    artisan: artisan1.id, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80' },
        { title: 'Molded Clay Utensils Set',         description: 'Jhelum river clay cooking pots and serving bowls, unglazed and eco-friendly.',     price:  85, stock: 20, category: 'Kitchenware', artisan: artisan2.id, imageUrl: 'https://images.unsplash.com/photo-1565193566-c47e3898a5a6?w=600&q=80' },
    ];
    const prods = [];
    for (const def of productDefs) prods.push(await createProduct(def));
    console.log(`${prods.length} products seeded.`);

    const orderData = [
        { customer: customer1.id, status: 'DELIVERED', items: [{ p: 0, q: 1 }, { p: 7, q: 1 }] },
        { customer: customer1.id, status: 'SHIPPED',   items: [{ p: 3, q: 2 }] },
        { customer: customer2.id, status: 'PENDING',   items: [{ p: 5, q: 1 }, { p: 6, q: 1 }] },
        { customer: customer2.id, status: 'DELIVERED', items: [{ p: 8, q: 1 }] },
        { customer: customer1.id, status: 'CANCELLED', items: [{ p: 1, q: 3 }, { p: 9, q: 2 }] },
    ];

    for (const od of orderData) {
        const total = od.items.reduce((sum, i) => sum + prods[i.p].price * i.q, 0);
        const order = await pb.collection('orders').create({ totalAmount: total, status: od.status, customer: od.customer });
        for (const i of od.items) {
            await pb.collection('orderItems').create({ order: order.id, product: prods[i.p].id, quantity: i.q, price: prods[i.p].price });
        }
    }
    console.log(`${orderData.length} orders seeded.`);
    console.log('Done!');
}

run().catch(console.error);
