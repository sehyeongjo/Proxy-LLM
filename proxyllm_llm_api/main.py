from flask import Flask, request, jsonify
import requests
import json

import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)

# Ollama API URL
OLLAMA_API_URL = "<<OLLAMA_API_URL>>"

nltk.download('vader_lexicon')

def get_sentiment_score(paragraph):

    sia = SentimentIntensityAnalyzer()    
    sentiment_scores = sia.polarity_scores(paragraph)
    
    return sentiment_scores

@app.route("/test")
def test():
    return  "test"

@app.route('/generate', methods=['POST'])
def generate_response():
    try:
        data = request.get_json()

        scores = get_sentiment_score(data["prompt"])

        choice = data["choice"]
        custom = data["custom"]

        prompt_text = data["prompt"]
        sentiment_info = "The sentiment score calculates a compound score summarizing overall sentiment on a scale from -1 (most negative) to 1 (most positive)."
        neutral_text = "a neutral tone to remove any emotional, biased, or subjective elements while preserving the original meaning."
        positive_text = "a positive tone, enhancing the optimism and uplifting language while preserving the original meaning and intent."

        if choice == "default":
            prompt_text += "Change this text style to be more polite."
        elif choice == "neutral":
            prompt_text += "The sentimental score of this text content is {}. {} \
                Change the text style to be {}".format(scores['compound'], sentiment_info, neutral_text)
        elif choice == "positive":
            prompt_text += "The sentimental score of this text content is {}. {} \
                Change the text style to be {}".format(scores['compound'], sentiment_info, positive_text)
        elif choice == "custom":
            if custom:
                prompt_text += "The sentimental score of this text content is {}. {} \
                Change the text style to be {}".format(scores['compound'], sentiment_info, custom)
            else:
                prompt_text += "The sentimental score of this text content is {}. {} \
                Change this text style to be more polite.".format(scores['compound'], sentiment_info)

        prompt_text += "Don't use like 'Here's a revised version of the message that sounds more polite and respectful : '. just only write message. Not the answer. Just change text style."

        print(prompt_text)

        # Request data to be sent to the Olama API
        ollama_payload = {
            "model": data.get("model", "<<TARGET_LLM_MODEL_NAME>>"),
            "prompt": prompt_text,
            "stream": False
        }

        # Send POST requests to the Olama API
        response = requests.post(
            OLLAMA_API_URL,
            headers={'Content-Type': 'application/json'},
            data=json.dumps(ollama_payload)
        )

        if response.status_code == 200:
            return jsonify(response.json()), 200
        else:
            return jsonify({"error": "Failed to generate response"}), response.status_code



    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port="<<PORT_NUM>>", debug=True)
