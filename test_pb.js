import PocketBase from 'pocketbase';

const pb = new PocketBase('http://195.35.22.110:8090');

async function run() {
    await pb.admins.authWithPassword('admin@craftconnect.com', 'Password123!');
    const users = await pb.collections.getOne('users');
    console.log(JSON.stringify(users.fields, null, 2));
}

run().catch(console.error);
