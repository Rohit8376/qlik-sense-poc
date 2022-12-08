const embed = window.stardust.embed;
const barchart = window[`sn-bar-chart`];
const mekko = window[`sn-mekko-chart`];
const line = window[`sn-line-chart`];
const comboChart = window[`sn-combo-chart`];
const scatterplot = window[`sn-scatter-plot`]; 
const piechart = window[`sn-pie-chart`]; 
const enigma = window.enigma; 

const n = embed.createConfiguration({

    context: {
        // theme: 'dark',
        //theme: 'pinkish',
        theme:'light',
        language: 'en-US',
        // constraints: { select: true },  // used to desable modify anf filter mushup

        constraints: {
            // active: true, // turn off interactions that affect the state of the visual representation like zoom, scroll, etc.
            // passive: true, // turn off interactions like tooltips. 
            //select: true, // turn off selections.
          },
          deviceType: 'auto' //Supports: auto, touch or desktop
    },
    
    types: [
        {
            name: 'barchart',
            load: () => Promise.resolve(barchart),
        },
        {
            name: 'combochart',
            load: () => Promise.resolve(comboChart),
        },
        {
            name: 'scatterplot',
            load: () => Promise.resolve(scatterplot),

        },
        {
            name: 'mekko',
            load: () => Promise.resolve(mekko),

        },
        {
            name: 'linechart',
            load: () => Promise.resolve(line),

        },
        {
            name: 'piechart',
            load: () => Promise.resolve(piechart)

        }
    ],
});

function connectLocal({ url, appId }) {
    const loadSchema = () =>
        fetch('https://unpkg.com/enigma.js/schemas/12.612.0.json').then((response) => response.json());
    const createConnection = () =>
        loadSchema().then((schema) =>
            enigma
                .create({
                    schema,
                    url: `wss://${url}/app/${appId}`,
                })
                .open()
                .then((qix) => qix.openDoc(`${appId}`))
        );
    return createConnection().then(
        (app) => app
    );
}

async function run() { 
    const app = await connectLocal({
        url: 'qliksenseserver.exponentia.ai', 
        appId:"2a41a653-2299-489a-ace5-c89364c5336b"  
    });
    const n2 = n(app);

   (await n2.selections()).mount(document.querySelector('.toolbar')); 

    n2.render({
        element: document.querySelector('.obj'),
        id: 'pqXn',
    }) 

    // n2.render({
    //     element: document.querySelector('.objone'),
    //     id: '34c1c019-fc24-4d67-b702-09151b1054ea',
    // });

    // n2.render({
    //     element: document.querySelector('.objtwo'),
    //     id: '80235795-6fa6-436d-839f-416bfee6470f',
    // }); 
    //  n2.render({
    //     element: document.querySelector('.objthree'),
    //     id: 'RrDK',
    // }); 


}



run();