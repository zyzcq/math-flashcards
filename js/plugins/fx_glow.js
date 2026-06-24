export function applyGlowEffect(element, options = {}) {
    const color = options.color || 'rgba(0, 150, 255, 0.8)';
    const blur = options.blur || '15px';
    const spread = options.spread || '5px';
    const inset = options.inset ? 'inset ' : '';
    
    element.style.boxShadow = `${inset}0 0 ${blur} ${spread} ${color}`;
    element.style.transition = 'box-shadow 0.3s ease-in-out';
}

export function removeGlowEffect(element) {
    element.style.boxShadow = 'none';
}
