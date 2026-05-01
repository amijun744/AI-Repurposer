/**
 * AI Repurposer - Aesthetic Animation Engine
 */

const handleTransform = async (): Promise<void> => {
    const btn = document.getElementById('transform-btn') as HTMLButtonElement;
    const input = document.getElementById('source-input') as HTMLTextAreaElement;
    
    if (!input.value) return;

    // Start loading state
    btn.innerText = "Repurposing...";
    btn.style.opacity = "0.7";

    // Simulate AI Processing with staggered reveal
    const tiles = document.querySelectorAll('.tile:not(.input-tile)');
    
    tiles.forEach((tile, index) => {
        const t = tile as HTMLElement;
        t.style.opacity = "0.3";
        t.style.filter = "blur(10px)";
        
        setTimeout(() => {
            t.style.opacity = "1";
            t.style.filter = "blur(0)";
            t.classList.add('reveal-animation');
            
            // Inject dummy AI data based on tile ID
            const output = t.querySelector('.output-content');
            if (output) {
                if (t.id === "x-output") output.innerHTML = "1/ Analyzing the core architecture... <br> 2/ Scaling decentralized nodes.";
                else output.innerHTML = "Success! Generated platform-specific copy.";
            }
        }, 800 * (index + 1)); // Stagger each tile by 800ms
    });

    setTimeout(() => {
        btn.innerText = "Generate Assets";
        btn.style.opacity = "1";
    }, 3000);
};