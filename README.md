# SynthesisLab 🧪✨

**SynthesisLab** is an advanced, AI-powered web application designed to synthesize high-fidelity, photorealistic 16:9 cinematic scenes around a 2D book cover asset. By leveraging Google's Gemini generative language and vision models, the app transforms simple textbook cover images into stunning, context-aware physical product photography.

![SynthesisLab Preview](https://raw.githubusercontent.com/OnkarPawar1/SynthesisLab/main/public/preview.png) *(Preview placeholder)*

🔗 **Live Demo:** [SynthesisLab on GitHub Pages](https://OnkarPawar1.github.io/SynthesisLab/)

---

## 🚀 Features

*   **Cinematic Scene Presets:** Choose from beautifully crafted, highly detailed scene descriptions (e.g., Alchemist Lab, Antique Study, Writer's Attic) to set the perfect mood for your book cover.
*   **Editable Prompt Editor:** Fine-tune and customize the generated prompts. The app automatically saves your edits, and you can easily reset to the original preset with a single click.
*   **Multi-Model Pipeline:**
    *   **Text Model:** Refines the initial prompt for maximum detail, focusing on clutter density, lighting, and textures.
    *   **Image Model:** Generates the highly detailed background scene based on the refined prompt.
    *   **Vision Model:** Synthesizes your uploaded 2D cover onto the generated scene, matching perspective and lighting without blurring the surrounding environment.
*   **Model Explorer:** View and select from a list of available Gemini models fetched directly via the API.
*   **Local Memory Storage:** Your API key, selected models, custom prompts, and cover assets are securely saved in your browser's local storage for a seamless experience across sessions.
*   **Premium Aesthetic:** Features a sleek dark theme, glassmorphism elements, and smooth interactions built with Tailwind CSS and Lucide icons.

---

## 🛠️ Usage

1.  **Get an API Key:** You need a valid Google Gemini API Key. Get one from Google AI Studio.
2.  **Enter API Key:** Paste your key into the top navigation bar.
3.  **Fetch Models:** Click the refresh icon next to the API key field to load the available language, image, and vision models.
4.  **Configure Models (Optional):** Select specific models from the "Config" panel or use the recommended defaults.
5.  **Select a Preset:** Choose a scene preset from the left panel (e.g., "Antique Study").
6.  **Customize the Prompt (Optional):** Edit the heavily detailed prompt in the text area. The app auto-saves your changes. Use the **Reset** button to revert to the original text.
7.  **Upload Cover Asset:** Click the dashed area to upload a 2D image of your book cover.
8.  **Generate:** Click the big "GENERATE 16:9 PHOTO" button and watch the pipelined magic happen!

---

## 💻 Tech Stack

*   **Frontend Framework:** React 18 + Vite
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **AI Integration:** Google Generative Language API (Gemini Pro, Flash, Imagen, etc.)
*   **Deployment:** GitHub Pages (`gh-pages`)

---

## ⚙️ Local Setup for Development

If you'd like to run SynthesisLab locally and modify the code:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/OnkarPawar1/SynthesisLab.git
    cd SynthesisLab
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    ```

---

## 🌟 Director's Note: Detail Synthesis

For ultra-high quality results with dense objects like globes, teapots, and scrolls, we recommend the **Golden Combo** observed in production:
Use **gemini-1.5-pro** (or similar capable model) as the Refiner, and robust vision models for the final Perspective Synthesis. This configuration maximizes perspective accuracy and lighting fidelity on complex desk surfaces.

---
*Created by Onkar Pawar.*
