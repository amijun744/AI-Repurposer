/**
 * REPURPOSE // KERNEL CORE v1.1
 * Corrected Elite Level Implementation
 */

// 1. Declare GSAP for the TypeScript Compiler
declare const gsap: any;

// 2. Engine State Management
let isProcessing = false;

// 3. Initial Entrance Animation
window.addEventListener('DOMContentLoaded', () => {
    gsap.from(".bento-card", {
        duration: 1.5,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.5
    });
});

async function runEliteEngine(): Promise<void> {
    // Error Prevention: Prevent multiple clicks while engine is running
    if (isProcessing) return;
    
    const input = document.getElementById('main-input') as HTMLTextAreaElement;
    const btn = document.querySelector('.execute-btn') as HTMLButtonElement;
    
    // Validation: Check if input exists and has content
    if (!input || !input.value.trim()) {
        gsap.to(".kernel", { x: [-10, 10, -10, 10, 0], duration: 0.4 }); // Shake error
        return;
    }

    isProcessing = true;
    if (btn) btn.disabled = true;

    // Trigger Visual Processing State
    gsap.to(".kernel", { 
        duration: 0.2, 
        borderColor: "#7000ff", 
        boxShadow: "0 0 20px rgba(112, 0, 255, 0.4)",
        repeat: 5, 
        yoyo: true 
    });

    const views = ['x-view', 'li-view', 'img-view'];
    
    // Process each view stream
    for (const viewId of views) {
        const el = document.getElementById(viewId);
        
        if (el) {
            // Set initial scanning state
            el.innerHTML = `<span class="scanning" style="color: #00f2ff; font-family: monospace;">>> DECRYPTING_DATA_STREAM...</span>`;
            
            // GSAP Sequence for "Digital Materialization"
            await new Promise<void>((resolve) => {
                gsap.to(el, {
                    opacity: 0.5,
                    duration: 0.1,
                    repeat: 5,
                    onComplete: () => {
                        el.innerHTML = getMockData(viewId);
                        gsap.fromTo(el, 
                            { filter: "blur(15px)", opacity: 0, scale: 0.95 }, 
                            { filter: "blur(0)", opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
                        );
                        resolve();
                    }
                });
            });
            
            // Slight delay between each card's materialization
            await new Promise(r => setTimeout(r, 400));
        }
    }

    // Reset Engine State
    isProcessing = false;
    if (btn) btn.disabled = false;
}

// Fixed Data Mapping to match the ID's correctly
function getMockData(type: string): string {
    const data: Record<string, string> = {
        'x-view': `<div class="node-text">>> THREAD INITIALIZED // 5 NODES <br> >> NODE 1: Analyzing technical architecture for DeFi scale.</div>`,
        'li-view': `<div class="node-text">>> INSIGHT: The intersection of Blockchain and AI is the final frontier for UX.</div>`,
        'img-view': `<div class="node-text">>> PROMPT: Cinematic render, refractive glass, cybernetic structures.</div>`
    };
    return data[type] || ">> DATA_NOT_FOUND";
}