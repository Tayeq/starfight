import { prisma } from './index';

async function main() {
    // Seed people
    await prisma.person.createMany({
        data: [
            { name: 'Luke Skywalker', mass: 77 },
            { name: 'Darth Vader', mass: 136 },
            { name: 'Leia Organa', mass: 49 },
            { name: 'Han Solo', mass: 80 },
            { name: 'Obi-Wan Kenobi', mass: 77 },
            { name: 'Yoda', mass: 17 },
            { name: 'Chewbacca', mass: 112 },
            { name: 'C-3PO', mass: 75 },
            { name: 'R2-D2', mass: 32 },
            { name: 'Lando Calrissian', mass: 79 },
            { name: 'Padmé Amidala', mass: 45 },
            { name: 'Mace Windu', mass: 84 },
            { name: 'Count Dooku', mass: 80 },
            { name: 'Rey', mass: 54 },
            { name: 'Finn', mass: 73 },
            { name: 'Poe Dameron', mass: 80 },
        ],
        skipDuplicates: true,
    });

    // Seed starships
    await prisma.starship.createMany({
        data: [
            { name: 'Millennium Falcon', crew: 4 },
            { name: 'Star Destroyer', crew: 47060 },
            { name: 'X-wing', crew: 1 },
            { name: 'TIE Fighter', crew: 1 },
            { name: 'Slave 1', crew: 1 },
            { name: 'Imperial Shuttle', crew: 6 },
            { name: 'Executor', crew: 279144 },
            { name: 'A-wing', crew: 1 },
            { name: 'B-wing', crew: 1 },
            { name: 'Naboo Starfighter', crew: 1 },
            { name: 'Jedi Interceptor', crew: 1 },
            { name: 'Venator-class Star Destroyer', crew: 7400 },
            { name: 'ARC-170', crew: 3 },
            { name: 'Droid Control Ship', crew: 175 },
            { name: 'Rebel Transport', crew: 6 },
            { name: 'Sandcrawler', crew: 46 },
        ],
        skipDuplicates: true,
    });

    console.log('Seed completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 