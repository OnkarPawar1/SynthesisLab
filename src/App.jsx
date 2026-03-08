import React, { useState, useEffect, useRef } from 'react';
import {
    Cpu,
    Key,
    Search,
    RefreshCw,
    Layers,
    Image as ImageIcon,
    Upload,
    Download,
    Sparkles,
    Settings2,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    Zap,
    Layout,
    BookOpen,
    Eye,
    Type,
    Plus,
    Camera,
    Info,
    Coffee,
    Globe,
    Wind,
    Compass,
    PenTool,
    FlaskConical,
    Sun,
    Stars,
    Trash2,
    Library,
    Palette
} from 'lucide-react';

const SCENE_PRESETS = [
    {
        id: 'antique_study',
        title: 'Antique Study',
        icon: <Library size={14} />,
        prompt: "A hyper-detailed, photorealistic 16:9 cinematic photograph of an incredibly cluttered, ancient library desk. The dark mahogany wood grain is highly textured and dusty. The scene is densely packed with high-detail objects: a vintage brass globe, a steaming ceramic teapot beside a delicate porcelain tea cup, a small crystal vase holding dried lavender, antique round wire-rimmed spectacles, scattered parchment scrolls, and a heavy brass inkwell with a feather quill. Warm, volumetric golden lamp light casts long, dramatic shadows across the desk. Floating dust motes are visible in the light rays. In the precise center foreground, clear of the beautiful chaos, a pristine blank white hardcover book lies completely flat at a natural perspective. Shot on a 35mm lens, 8k resolution, masterpiece."
    },
    {
        id: 'alchemist',
        title: 'Alchemist Lab',
        icon: <FlaskConical size={14} />,
        prompt: "A hyper-detailed, photorealistic 16:9 cinematic photograph of a medieval alchemist's heavy oak workbench deep within a stone-walled cellar. The desk is overwhelmingly cluttered with high-detail objects: bubbling asymmetrical glass vials filled with luminescent blue and green liquids, bundles of rare drying herbs, scattered ancient scrolls with peeling wax seals, a heavy iron mortar and pestle containing crushed glowing minerals, and half-melted dripping beeswax candles. Ethereal atmospheric smoke and mist linger in the air. Moody, warm orange candlelight casts long, dramatic volumetric shadows across the rough wood grain. In the absolute center foreground, perfectly clear of the surrounding magical chaos, a pristine blank white hardcover book lies completely flat at a natural reading angle. Shot with a shallow depth of field, 8k resolution, incredibly sharp textures."
    },
    {
        id: 'explorer',
        title: 'Victorian Explorer',
        icon: <Compass size={14} />,
        prompt: "A breathtakingly detailed 16:9 photograph of a weathered Victorian explorer's campaign desk. The scarred, leather-topped desk is covered in the artifacts of a world traveler: a complex brass sextant, a folded, hand-drawn map of uncharted territories, a leather-bound spyglass telescope, exotic fossilized sea shells, scattered gold coins, and an intricate pocket compass. Sharp, volumetric golden hour sunlight streams horizontally through a nearby window, creating high-contrast lighting and illuminating floating dust particles. In the center foreground, acting as the focal point amidst the historical clutter, a completely blank white hardcover book rests flat. Cinematic lighting, ultra-realistic textures, 8k resolution, award-winning photography."
    },
    {
        id: 'writer_attic',
        title: 'Writer\'s Attic',
        icon: <PenTool size={14} />,
        prompt: "An incredibly atmospheric, highly textured 16:9 photograph of a bohemian writer's attic desk at the stroke of midnight. The scene is a beautiful, chaotic mess: a heavy vintage Underwood typewriter, crumpled balls of parchment paper overflowing from the desk, a half-empty glass of red wine catching the light, an old glowing oil lamp, a ceramic mug with dark coffee stains, and a brass tray holding a single silver fountain pen. The wood of the desk is deeply scarred and stained with ink. A single, warm tungsten bulb hangs overhead, casting deep, moody shadows. Positioned flat in the center foreground, sharply in focus, is a perfectly blank white hardcover book waiting to be written. Cinematic, gritty but beautiful, 8k macro photography."
    },
    {
        id: 'zen_matcha',
        title: 'Zen Tea Room',
        icon: <Coffee size={14} />,
        prompt: "A serene, hyper-realistic 16:9 photograph of a traditional Japanese Zen tea room. The desk surface is made of dark, aged wabi-sabi wood with beautiful imperfections. The highly detailed arrangement includes a heavy cast iron tetsubin kettle, a delicate bamboo chasen (whisk) resting next to a handmade ceramic matcha bowl containing vibrant green tea, a small manicured bonsai tree in a clay pot, and a stone lantern. Soft, diffused, ethereal morning light filters through shoji screens, creating a peaceful, meditative atmosphere with soft shadows. In the center foreground, contrasting with the dark wood, a pristine blank white hardcover book lies perfectly flat. Masterpiece, highly detailed, photorealistic lighting, 8k."
    },
    {
        id: 'astronomy',
        title: 'Star Observatory',
        icon: <Stars size={14} />,
        prompt: "A visually stunning, detail-rich 16:9 cinematic photograph of an astronomer's chaotic desk high in a gothic observatory tower. The desk is scattered with celestial tools: complex brass telescopes, unfolded star charts covered in geometric lines, a glowing crystal sphere refracting light, heavy optical glass lenses, and several ticking brass pocket watches. The lighting is a dramatic dual-tone mix: cool, ethereal blue moonlight spills across the desk from an unseen window, contrasting heavily with the warm, flickering orange glow of a nearby candle. In the exact center foreground, bathed in the mixed light, a perfectly blank white hardcover book lies flat. Ultra-detailed, photorealistic, cinematic lighting, 8k."
    },
    {
        id: 'clockmaker',
        title: 'Clockmaker',
        icon: <Cpu size={14} />,
        prompt: "A mesmerizing macro-photography 16:9 shot of a master horologist's intricate workbench. The surface is a dense, high-detail landscape of microscopic mechanics: hundreds of scattered, shining brass cogs and gears, tiny coiled springs, microscopic jeweled screwdrivers, a brass magnifying loupe, tweezers, and three partially disassembled ticking pocket watches. A bright, focused workbench lamp casts sharp, distinct shadows, highlighting the metallic reflections and tiny drops of machine oil on the scarred wood. In the center foreground, providing a clean contrast to the mechanical chaos, a completely blank white hardcover book lies perfectly flat. Incredibly sharp focus, highly detailed textures, masterpiece."
    },
    {
        id: 'herbalist',
        title: 'Herbalist',
        icon: <Wind size={14} />,
        prompt: "A vibrant, sun-drenched 16:9 photograph of an overgrown, hyper-detailed botanist's potting bench. The rustic wooden table is covered in earthy textures: scattered potting soil, terracotta pots with small sprouting ferns, heavy iron gardening shears, bundles of fresh lavender and rosemary, glass apothecary jars filled with brightly colored dried flower petals, and a weathered copper watering can. A fine mist hangs in the air, catching the bright, volumetric rays of sunlight filtering through a greenhouse roof. Right in the center foreground, resting flat on the earthy table, is a pristine blank white hardcover book. High detail, vibrant colors, photorealistic, 8k resolution."
    },
    {
        id: 'artist',
        title: 'Artist Studio',
        icon: <Palette size={14} />,
        prompt: "A richly textured, hyper-realistic 16:9 photograph of a messy renaissance painter's studio workbench. The table is a riot of color and detail: a heavily used wooden palette smeared with thick impasto blobs of vibrant oil paint, scattered crumpled lead tubes of pigments, a large mason jar filled with murky water and dozens of stained wooden paintbrushes, a small classical plaster bust, and a glass bottle of amber linseed oil. Soft, cool, diffuse northern studio light bathes the scene, highlighting the wet, glossy textures of the paint against the dry wood. In the center foreground, perfectly untouched by the paint, a blank white hardcover book lies flat. Masterpiece, cinematic lighting, ultra-detailed."
    },
    {
        id: 'wizard',
        title: 'Wizardry Sanctum',
        icon: <Sparkles size={14} />,
        prompt: "A magical, hyper-detailed 16:9 cinematic photograph of an archmage's deeply cluttered sanctum desk. The dark wood is etched with ancient, faintly glowing arcane runes. The dense clutter includes: an iridescent, glowing dragon scale, a brass hourglass filled with shimmering purple sand, a large raven feather quill resting on a spilled bottle of shimmering silver ink, and small leather satchels of rare spell components. Ethereal, floating motes of magical energy drift through the air. The lighting is deeply moody, featuring rich volumetric purple and gold ambient glows. In the absolute center foreground, perfectly flat and ready for an incantation, is a pristine blank white hardcover book. 8k, photorealistic, epic fantasy lighting."
    }
];

const getSavedState = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        return saved !== null ? saved : defaultValue;
    } catch (e) {
        return defaultValue;
    }
};

export default function App() {
    const [apiKey, setApiKey] = useState(() => getSavedState('synthLab_apiKey', ''));
    const [allModels, setAllModels] = useState([]);
    const [isFetchingModels, setIsFetchingModels] = useState(false);

    const [selectedTextModel, setSelectedTextModel] = useState(() => getSavedState('synthLab_textModel', ''));
    const [selectedImageModel, setSelectedImageModel] = useState(() => getSavedState('synthLab_imageModel', ''));
    const [selectedVisionModel, setSelectedVisionModel] = useState(() => getSavedState('synthLab_visionModel', ''));

    const [customPrompt, setCustomPrompt] = useState(() => getSavedState('synthLab_prompt', SCENE_PRESETS[0].prompt));
    const [activePresetId, setActivePresetId] = useState(() => getSavedState('synthLab_activePreset', SCENE_PRESETS[0].id));
    const [coverBase64, setCoverBase64] = useState(() => getSavedState('synthLab_cover', null));

    const [sceneBase64, setSceneBase64] = useState(null);
    const [finalImage, setFinalImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState(null);
    const [showExplorer, setShowExplorer] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        try {
            localStorage.setItem('synthLab_apiKey', apiKey);
            localStorage.setItem('synthLab_textModel', selectedTextModel);
            localStorage.setItem('synthLab_imageModel', selectedImageModel);
            localStorage.setItem('synthLab_visionModel', selectedVisionModel);
            localStorage.setItem('synthLab_prompt', customPrompt);
            localStorage.setItem('synthLab_activePreset', activePresetId);
            if (coverBase64) {
                localStorage.setItem('synthLab_cover', coverBase64);
            } else {
                localStorage.removeItem('synthLab_cover');
            }
        } catch (e) {
            console.warn("Could not save to local storage. (Cover image might be too large)");
        }
    }, [apiKey, selectedTextModel, selectedImageModel, selectedVisionModel, customPrompt, coverBase64, activePresetId]);

    const handleClearMemory = () => {
        if (window.confirm("Are you sure you want to clear all saved settings, API keys, and images?")) {
            try {
                localStorage.removeItem('synthLab_apiKey');
                localStorage.removeItem('synthLab_textModel');
                localStorage.removeItem('synthLab_imageModel');
                localStorage.removeItem('synthLab_visionModel');
                localStorage.removeItem('synthLab_prompt');
                localStorage.removeItem('synthLab_activePreset');
                localStorage.removeItem('synthLab_cover');
            } catch (e) {
                console.warn("Could not clear local storage.");
            }
            setApiKey('');
            setSelectedTextModel('');
            setSelectedImageModel('');
            setSelectedVisionModel('');
            setCustomPrompt(SCENE_PRESETS[0].prompt);
            setActivePresetId(SCENE_PRESETS[0].id);
            setCoverBase64(null);
            setFinalImage(null);
            setSceneBase64(null);
            setError("Memory cleared. The app has been reset.");
        }
    };

    const fetchModels = async () => {
        if (!apiKey) return setError("Please enter an API Key first.");
        setIsFetchingModels(true);
        setError(null);
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
            const data = await response.json();
            if (data.error) throw new Error(data.error.message);
            const models = data.models.map(m => ({
                id: m.name.replace('models/', ''),
                display: m.displayName,
                methods: m.supportedGenerationMethods || [],
                isImage: m.name.includes('imagen') || m.name.includes('image'),
                isVision: (m.supportedGenerationMethods || []).includes('generateContent'),
                isLatest: m.name.includes('2.5') || m.name.includes('3.1')
            }));
            setAllModels(models);

            if (!selectedTextModel) setSelectedTextModel(models.find(m => m.id === 'gemini-1.5-pro')?.id || models.find(m => m.id.includes('flash'))?.id || '');
            if (!selectedImageModel) setSelectedImageModel(models.find(m => m.id.includes('imagen'))?.id || '');
            if (!selectedVisionModel) setSelectedVisionModel(models.find(m => m.id.includes('vision') || m.methods.includes('generateContent'))?.id || '');
        } catch (err) {
            setError("Failed to fetch: " + err.message);
        } finally {
            setIsFetchingModels(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError("Image is too large (max 2MB). Please use a smaller file so it can be saved in memory.");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setCoverBase64(event.target.result.split(',')[1]);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const executePipeline = async () => {
        if (!apiKey || !coverBase64) return setError("Missing API Key or Book Cover.");
        setIsProcessing(true);
        setError(null);
        setFinalImage(null);
        try {
            setCurrentStep(1);
            const textUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedTextModel}:generateContent?key=${apiKey}`;
            const textRes = await fetch(textUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `Act as a world-class cinematography director. Refine this 16:9 prompt for maximum detail and realism. Subject: blank white hardcover book placeholder. Focus: Clutter density, volumetric light, physical textures, and perspective matching: ${customPrompt}` }] }]
                })
            });
            const textData = await textRes.json();
            if (textData.error) throw new Error(textData.error.message);
            const refinedPrompt = textData.candidates?.[0]?.content?.parts?.[0]?.text || customPrompt;

            setCurrentStep(2);
            const isImagen = selectedImageModel.includes('imagen');
            const imgUrl = isImagen
                ? `https://generativelanguage.googleapis.com/v1beta/models/${selectedImageModel}:predict?key=${apiKey}`
                : `https://generativelanguage.googleapis.com/v1beta/models/${selectedImageModel}:generateContent?key=${apiKey}`;

            const payload = isImagen
                ? { instances: { prompt: refinedPrompt }, parameters: { sampleCount: 1 } }
                : { contents: [{ parts: [{ text: refinedPrompt }] }], generationConfig: { responseModalities: ['IMAGE'] } };

            const imgRes = await fetch(imgUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const imgData = await imgRes.json();
            if (imgData.error) throw new Error(imgData.error.message);

            const scene = isImagen ? imgData.predictions?.[0]?.bytesBase64Encoded : imgData.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
            if (!scene) throw new Error("Scene model failed to return an image.");
            setSceneBase64(scene);

            setCurrentStep(3);
            const visUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedVisionModel}:generateContent?key=${apiKey}`;
            const visRes = await fetch(visUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: "Synthesize Image 1 (2D Cover) onto the blank book in Image 2. Match the exact 16:9 cinematic perspective and moody lamp lighting. The cover must appear physically printed. Do not blur the surrounding clutter." },
                            { inlineData: { mimeType: "image/png", data: coverBase64 } },
                            { inlineData: { mimeType: "image/png", data: scene } }
                        ]
                    }],
                    generationConfig: { responseModalities: ['IMAGE'] }
                })
            });
            const visData = await visRes.json();
            if (visData.error) throw new Error(visData.error.message);

            const final = visData.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
            if (!final) throw new Error("Synthesis failed.");
            setFinalImage(`data:image/png;base64,${final}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsProcessing(false);
            setCurrentStep(0);
        }
    };

    const addCustomModel = (type) => {
        const id = prompt("Manual Model ID:");
        if (!id) return;
        const newM = { id, display: "Manual", methods: ["generateContent"], isImage: id.includes('imagen'), isVision: true, isLatest: true };
        setAllModels(prev => [newM, ...prev]);
        if (type === 'text') setSelectedTextModel(id);
        if (type === 'image') setSelectedImageModel(id);
        if (type === 'vision') setSelectedVisionModel(id);
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-slate-300 font-sans selection:bg-indigo-500/30">
            <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Synthesis<span className="text-indigo-500 font-normal">Lab</span></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group hidden md:block">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input type="password" placeholder="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-xs w-64 outline-none focus:border-indigo-500" />
                        </div>
                        <button onClick={fetchModels} disabled={isFetchingModels} title="Fetch Models" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <RefreshCw className={`w-5 h-5 ${isFetchingModels ? 'animate-spin' : ''}`} />
                        </button>
                        <div className="h-6 w-px bg-white/10 mx-1"></div>
                        <button onClick={handleClearMemory} title="Clear Saved Data & Reset" className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition-colors">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-6">
                    <section className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
                        <header className="flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <Layers className="w-4 h-4" /> Config
                            </h2>
                            <button onClick={() => setShowExplorer(true)} className="text-[10px] text-indigo-400 font-bold">Explorer</button>
                        </header>
                        <div className="space-y-4">
                            {['text', 'image', 'vision'].map(type => (
                                <div key={type} className="space-y-1.5">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                                        <span className="flex items-center gap-1.5">
                                            {type === 'text' ? <Type size={12} /> : type === 'image' ? <ImageIcon size={12} /> : <Eye size={12} />} {type} Model
                                        </span>
                                        <button onClick={() => addCustomModel(type)} className="text-slate-600 flex items-center gap-1">
                                            <Plus size={10} />Manual
                                        </button>
                                    </div>
                                    <select value={type === 'text' ? selectedTextModel : type === 'image' ? selectedImageModel : selectedVisionModel} onChange={(e) => type === 'text' ? setSelectedTextModel(e.target.value) : type === 'image' ? setSelectedImageModel(e.target.value) : setSelectedVisionModel(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 text-xs outline-none">
                                        <option value="">Select or Type Manual ID...</option>
                                        {allModels.map(m => <option key={m.id} value={m.id}>{m.id}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" /> Scene Presets
                            </h2>
                            <span className="text-[9px] text-slate-500 uppercase">Click to Load & Edit</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {SCENE_PRESETS.map(preset => (
                                <button key={preset.id} onClick={() => { setActivePresetId(preset.id); setCustomPrompt(preset.prompt); }} className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${activePresetId === preset.id ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' : 'bg-black/40 border-white/5 text-slate-500 hover:border-white/10'}`}>
                                    {preset.icon} <span className="text-[11px] font-medium leading-tight">{preset.title}</span>
                                </button>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-white/5 space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                                    <PenTool className="w-3 h-3 text-purple-400" /> Editable Prompt Editor
                                </label>
                                <button
                                    onClick={() => {
                                        const original = SCENE_PRESETS.find(p => p.id === activePresetId)?.prompt || SCENE_PRESETS[0].prompt;
                                        setCustomPrompt(original);
                                    }}
                                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition-colors"
                                    title="Reset to Original Preset"
                                >
                                    <RefreshCw size={10} /> Reset
                                </button>
                            </div>
                            <textarea value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-[11px] leading-relaxed text-slate-300 outline-none focus:border-indigo-500 transition-colors" rows={8} placeholder="Select a preset above or type your highly detailed 16:9 scene description here..." />
                            <p className="text-[9px] text-slate-500 flex items-center gap-1 italic">
                                <Info className="w-3 h-3" /> Changes are auto-saved in memory.
                            </p>
                        </div>
                    </section>

                    <section className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Cover Asset</h2>
                        <div onClick={() => fileInputRef.current.click()} className={`relative group aspect-[9/12] rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all ${coverBase64 ? 'border-indigo-500' : 'border-white/10 hover:bg-white/5'}`}>
                            {coverBase64 ? <img src={`data:image/png;base64,${coverBase64}`} className="w-full h-full object-cover rounded-xl" /> : <Upload className="text-slate-700" />}
                            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                        </div>
                    </section>

                    <button disabled={isProcessing || !coverBase64 || !apiKey} onClick={executePipeline} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/5 text-white font-bold py-4 rounded-3xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-indigo-900/20">
                        {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />} GENERATE 16:9 PHOTO
                    </button>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="relative aspect-video w-full bg-black rounded-[40px] border border-white/10 shadow-3xl overflow-hidden flex items-center justify-center">
                        {isProcessing && (
                            <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center text-center p-12 space-y-8">
                                <div className="w-24 h-24 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{currentStep === 1 ? "Expanding Atmosphere..." : currentStep === 2 ? "Generating Clutter..." : "Synthesis in Progress..."}</h3>
                                    <div className="flex gap-2 justify-center">{[1, 2, 3].map(s => <div key={s} className={`h-1 w-12 rounded-full transition-all duration-700 ${currentStep >= s ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-white/10'}`}></div>)}</div>
                                </div>
                            </div>
                        )}
                        {finalImage ? <img src={finalImage} className="w-full h-full object-cover animate-in fade-in duration-1000" /> : <div className="text-center space-y-4 max-w-sm"><Layout className="w-12 h-12 text-slate-800 mx-auto" /><h3 className="text-xl font-bold text-white">Cinematic Output</h3><p className="text-slate-500 text-xs">High-detail clutter synthesis will appear here.</p></div>}
                        {error && (
                            <div className="absolute bottom-8 left-8 right-8 bg-slate-900/90 border border-slate-700 p-5 rounded-2xl flex items-start gap-4 text-slate-200 z-30 shadow-2xl backdrop-blur-md">
                                <AlertCircle size={24} className={error.includes('Memory cleared') ? 'text-emerald-500' : 'text-red-500'} />
                                <div className="flex-1">
                                    <p className="text-xs font-bold uppercase tracking-wider">{error.includes('Memory cleared') ? 'Status' : 'Error'}</p>
                                    <p className="text-sm mt-1">{error}</p>
                                </div>
                                <button onClick={() => setError(null)} className="text-slate-500 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
                            </div>
                        )}
                    </div>

                    <div className="bg-indigo-600/5 border border-indigo-500/20 p-6 rounded-[32px] space-y-3">
                        <div className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-indigo-400" /><h4 className="text-sm font-bold text-white uppercase tracking-widest">Director's Note: Detail Synthesis</h4></div>
                        <p className="text-[13px] text-slate-400 leading-relaxed">
                            For ultra-high quality results with dense objects like globes, teapots, and scrolls, we recommend the <strong>Golden Combo</strong> observed in production:
                            Use <strong>gemini-1.5-pro</strong> as the Refiner, and vision models for the final Perspective Synthesis.
                            This configuration maximizes perspective accuracy and lighting fidelity on complex desk surfaces.
                        </p>
                    </div>
                </div>
            </main>

            {showExplorer && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-10">
                    <div className="bg-slate-900 border border-white/10 w-full max-w-4xl h-full rounded-[40px] flex flex-col overflow-hidden shadow-2xl">
                        <header className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Model Explorer</h2>
                                <p className="text-sm text-slate-500">Active Pipeline Discovery</p>
                            </div>
                            <button onClick={() => setShowExplorer(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full"><ChevronRight /></button>
                        </header>
                        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {allModels.map(m => (
                                <div key={m.id} className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl">
                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${m.isLatest ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-500/20 text-slate-400'}`}>{m.isLatest ? 'Latest' : 'Standard'}</span>
                                    <h4 className="font-mono text-sm text-white mt-2">{m.id}</h4>
                                    <div className="flex flex-wrap gap-1 mt-3">{m.methods.map(method => <span key={method} className="text-[9px] bg-black/40 text-slate-500 px-2 py-0.5 rounded border border-white/5 uppercase">{method}</span>)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
