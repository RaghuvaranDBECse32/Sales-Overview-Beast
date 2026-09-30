import ScrollytellingCanvas from '../components/ScrollytellingCanvas';
import fs from 'fs';
import path from 'path';

export default async function Page() {
    // Layer 2: Orchestration - Fetching from Layer 3 intermediate
    const filePath = path.join(process.cwd(), 'tmp/processed_sales.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const salesData = JSON.parse(fileData);

    return (
        <main>
            <ScrollytellingCanvas salesData={salesData} />
        </main>
    );
}
