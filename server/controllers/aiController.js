const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.generateResume = async (req, res, next) => {
    try {
        const { currentResumeText, targetJobDescription } = req.body;
        
        if (!process.env.AI_API_KEY) {
            return res.status(500).json({ success: false, error: "AI API Key not configured." });
        }

        const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
            You are an expert ATS resume writer and career coach.
            I have the following current resume text:
            """${currentResumeText}"""
            
            And I am targeting the following job description:
            """${targetJobDescription}"""
            
            Please rewrite and optimize the resume for this job description. Ensure the output is highly professional, emphasizes impact, and uses keywords from the job description to pass ATS. Format the output in clean JSON with the following structure:
            {
                "summary": "Professional summary...",
                "experience": [
                    { "title": "Role", "company": "Company", "description": "Bullet points..." }
                ],
                "skills": ["Skill 1", "Skill 2"]
            }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Strip markdown code block formatting if present
        if (text.startsWith('```json')) {
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        }

        const jsonOutput = JSON.parse(text);

        res.status(200).json({
            success: true,
            data: jsonOutput
        });
    } catch (err) {
        console.error("Gemini API Error:", err);
        res.status(500).json({ success: false, error: 'Failed to generate resume with AI' });
    }
};

exports.mockInterviewQuestion = async (req, res, next) => {
    try {
        const { targetRole, difficulty, previousQuestions } = req.body;
        
        if (!process.env.AI_API_KEY) {
            return res.status(500).json({ success: false, error: "AI API Key not configured." });
        }

        const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prevContext = previousQuestions && previousQuestions.length > 0 
            ? `You have already asked these questions: ${previousQuestions.join(', ')}` 
            : "This is the first question.";

        const prompt = `
            You are a technical interviewer at a top tech company. 
            The candidate is applying for a ${difficulty} level ${targetRole} position.
            ${prevContext}
            
            Generate ONE highly relevant and challenging interview question for this candidate. Do not include any other text or greetings, just the question itself.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const question = response.text().trim();

        res.status(200).json({
            success: true,
            data: { question }
        });
    } catch (err) {
        console.error("Gemini API Error:", err);
        res.status(500).json({ success: false, error: 'Failed to generate mock interview question' });
    }
};
