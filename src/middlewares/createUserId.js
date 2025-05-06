export const generateUserId = (() => {
    const ids = Array.from({ length: 9000 }, (_, i) => i + 1000);
    for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    let current = 0;
    return () => ids[current++];
})();