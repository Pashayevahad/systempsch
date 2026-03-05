import React, { useEffect, useRef, useState } from 'react';

const ImageSequenceCanvas = ({
    dirPath,
    prefix,
    totalFrames = 80,
    fps = 24,
    extension = '.jpg',
    className = "absolute inset-0 w-full h-full object-cover z-0"
}) => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const currentFrameRef = useRef(0);

    // Preload images
    useEffect(() => {
        let isMounted = true;
        const loadedImages = new Array(totalFrames);
        let loaded = 0;

        const loadImages = async () => {
            const promises = [];
            for (let i = 0; i < totalFrames; i++) {
                promises.push(new Promise((resolve) => {
                    const img = new Image();
                    // Format number with leading zeros (e.g., 000, 001 ... 079)
                    const paddedIndex = String(i).padStart(3, '0');
                    img.src = `${dirPath}/${prefix}${paddedIndex}${extension}`;

                    img.onload = () => {
                        if (isMounted) {
                            loadedImages[i] = img;
                            loaded++;
                            setLoadedCount(loaded);
                            resolve();
                        }
                    };
                    img.onerror = () => {
                        console.warn(`Failed to load image: ${img.src}`);
                        resolve(); // Resolve anyway to avoid blocking
                    };
                }));
            }

            // We wait for all to load, or at least attempt to.
            // The canvas logic will skip frames if they aren't loaded yet.
            await Promise.all(promises);
            if (isMounted) {
                setImages(loadedImages);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, [dirPath, prefix, totalFrames, extension]);

    const animate = time => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            // Time per frame in ms
            const frameTime = 1000 / fps;

            if (deltaTime >= frameTime) {
                // Determine how many frames we should advance based on time passed
                // This ensures smooth playback even if we miss a paint
                const framesToAdvance = Math.floor(deltaTime / frameTime);

                if (framesToAdvance > 0) {
                    currentFrameRef.current = (currentFrameRef.current + framesToAdvance) % totalFrames;
                    previousTimeRef.current = time - (deltaTime % frameTime);

                    drawFrame(currentFrameRef.current);
                }
            }
        } else {
            previousTimeRef.current = time;
            drawFrame(currentFrameRef.current);
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    const drawFrame = (frameIndex) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[frameIndex];

        // Only draw if the image has actually loaded
        if (img) {
            // Check canvas dimensions, update if needed to match window/container
            const parent = canvas.parentElement;
            if (parent && (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight)) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }

            // Object-cover style drawing
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;

            const scale = Math.max(cw / iw, ch / ih);
            const w = iw * scale;
            const h = ih * scale;
            const x = (cw - w) / 2;
            const y = (ch - h) / 2;

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, x, y, w, h);
        }
    };

    useEffect(() => {
        // Only start animating if we have at least one image loaded to show
        if (loadedCount > 0) {
            requestRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [loadedCount, images, fps, totalFrames]);

    // Draw the very first frame as soon as it's ready, even before animation loop kicks in fully
    useEffect(() => {
        if (images[0] && currentFrameRef.current === 0) {
            drawFrame(0);
        }
    }, [images]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
        />
    );
};

export default ImageSequenceCanvas;
