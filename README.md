# ProxyLLM : LLM-Driven Framework for Customer Support Through Text-Style Transfer

This repository is the official implementation of [ProxyLLM : LLM-Driven Framework for Customer Support Through Text-Style Transfer](https://link.springer.com/chapter/10.1007/978-3-032-06129-4_28)

## Accepted European Conference on Machine Learning and Principles and Practice of Knowledge Discovery in Databases (ECML PKDD), 2025

[Sehyeong Jo](https://scholar.google.com/citations?user=jBfesEcAAAAJ&hl=en),
[Jungwon Seo](https://scholar.google.com/citations?user=ttx5rz0AAAAJ&hl=en)

[![arXiv](https://img.shields.io/badge/arXiv-2412.09916-b31b1b.svg)](https://arxiv.org/pdf/2412.09916)

## Abstract

Chatbot-based customer support services have significantly advanced with the introduction of large language models (LLMs), enabling enhanced response quality and broader application across industries. However, while these advancements focus on reducing business costs and improving customer satisfaction, limited attention has been given to the experiences of customer service agents, who are critical to the service ecosystem. A major challenge faced by agents is the stress induced by verbal abuse and emotionally charged interactions, which not only impairs their efficiency but also negatively impacts customer satisfaction and business outcomes. In this work, we propose an LLM-based request-response transformer designed not to replace agents but to safeguard their mental well-being. Our approach leverages LLMs to mediate emotionally charged customer requests, ensuring high-quality responses while alleviating the psychological burden on agents. Furthermore, the application is implemented as a Chrome extension, making it highly adaptable and easy to integrate into existing systems. By addressing these challenges, our method aims to enhance the overall service experience for businesses, customers, and agents alike.

## Overview of the ProxyLLM

<img width="1444" alt="overview" src="https://github.com/user-attachments/assets/ecf81d23-a72a-45d6-aa72-4a7304e81635">

## Application Workflow

<img width="1507" alt="workflow" src="https://github.com/user-attachments/assets/bc6fcb90-274e-4546-a2eb-1eb46d58322c">

## LLM API Server

The backend server is a [Flask](https://flask.palletsprojects.com/en/3.0.x/) server.

## Demo

### Text-style Transfer

<https://github.com/user-attachments/assets/d58bf630-1c33-4af1-ac5e-74c711f90adb>

### Personal Sentiment Setting

<https://github.com/user-attachments/assets/ee3028ff-d616-4464-b485-e8263f01b371>

## Evaluation Sample Texts

| <center>No</center> | <center>Original Text</center>                                                                                                                                                                                                                    | <center>Transferred Text</center>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1                   | "I am extremely disappointed with the product I received. It arrived damaged, and it does not match the description on your website. I need an immediate resolution, or I will have to escalate this further."                                    | "I'm excited to work with you to resolve this issue! I understand that the product didn't meet your expectations, arrived damaged, and doesn't match the description on our website. I want to assure you that we're committed to making things right. Can we discuss some options for a quick resolution? We value your satisfaction and would like to provide a suitable replacement or refund. Let's work together to find a solution that meets your needs!"                                                                                                        |
| 2                   | "The service I experienced at your store was unacceptable. The staff was rude and unhelpful, and I left feeling completely disrespected. I would like an explanation and assurance that this won’t happen again."                                 | "I recently visited your store and unfortunately had an underwhelming experience. The staff seemed to be having an off day, and I left feeling unfulfilled. I would appreciate it if you could help me understand what happened and assure me that steps will be taken to prevent this from occurring in the future."                                                                                                                                                                                                                                                   |
| 3                   | "I ordered my package weeks ago, and it still hasn’t arrived. The tracking information hasn’t been updated, and your support team has been unresponsive. This is unacceptable, and I demand a refund or a replacement immediately."               | "I wanted to follow up on my package order that I placed several weeks ago, as I'm getting close to my expected delivery date. Could you kindly look into this for me? The tracking information hasn't been updated yet, and I haven't received a response from your support team. I'd greatly appreciate it if we could find a resolution, perhaps with a refund or replacement option, so I can complete my order successfully."                                                                                                                                      |
| 4                   | "The item I purchased stopped working within a week of use. I followed all the instructions carefully, so this is clearly a defective product. I expect a replacement or a full refund without delay."                                            | "I'm disappointed with my recent purchase, as it stopped working within a week of use. I carefully followed all instructions, so I believe there may be an issue with the product itself. I would greatly appreciate a replacement or a full refund at your earliest convenience. Your assistance in this matter will be much appreciated and help me to continue using the item that was advertised."                                                                                                                                                                  |
| 5                   | "I had a terrible experience with your call center. I was put on hold for over 30 minutes, and when someone finally answered, they were dismissive and unhelpful. This level of service is completely unacceptable."                              | "I'm really disappointed with my experience at your call center. Unfortunately, I was put on hold for over 30 minutes before someone finally answered, and although they were trying their best, they seemed quite overwhelmed and unable to assist me effectively. I believe this level of service is below what customers like myself expect from a reputable company."                                                                                                                                                                                               |
| 6                   | "I am writing to express my frustration with your billing department. I was overcharged, and despite multiple emails, I haven’t received any response or resolution. I expect this issue to be addressed immediately."                            | "I wanted to take a moment to express my gratitude for your billing department, despite a recent discrepancy with my account. I appreciate the efforts they've made to address my concerns through email, even if I haven't yet received a resolution. I'm confident that this matter will be taken care of promptly and efficiently, and I look forward to a positive outcome. I'm excited about the opportunity for us to resolve this issue together and move forward with our relationship on a strong note. Thank you for your time and attention to this matter.” |
| 7                   | "The technician who came to fix my issue was extremely unprofessional. They were late, didn’t resolve the problem, and left a mess behind. This is not the level of service I expected from your company."                                        | "I was really looking forward to having my issue resolved by your technician, but unfortunately, they were running behind schedule, couldn't quite get it fixed, and made a bit of a mess in the process. I'm hoping that this experience doesn't set the tone for our ongoing relationship with your company - I'd love to see some improvements in the service department!"                                                                                                                                                                                           |
| 8                   | "I was assured that my order would arrive on time, but it was delayed by several days without any notice. This caused significant inconvenience, and I expect compensation for the delay."                                                        | "I was told that my order would arrive on schedule, but it ended up being delayed by several days without any prior notice. Although this setback caused some inconvenience, I appreciate your attention to this matter and hope we can resolve it amicably. I'm confident that we can find a solution together that satisfies both of us."                                                                                                                                                                                                                             |
| 9                   | "The subscription service you offer is a nightmare to cancel. I’ve tried multiple times to get in touch with your team, but no one seems willing to help. This feels like a deliberate attempt to trap customers, and I demand immediate action." | "I appreciate your feedback regarding our subscription service cancellation process. I'm so sorry to hear that you've had trouble getting in touch with our team. That doesn't sound like the experience we want for our valued customers. We're committed to making things right and would love the opportunity to help you cancel your subscription now. Can you please give us another chance to assist you? We'll do our best to ensure a smooth and hassle-free cancellation process from here on out."                                                            |
| 10                  | "The warranty claim process has been an absolute disaster. I submitted all the required documents weeks ago, but I haven’t heard anything back. This is highly frustrating, and I expect an update as soon as possible."                          | "I'm reaching out regarding my warranty claim, which I submitted with all required documents several weeks ago. I'd greatly appreciate it if someone could look into this matter as soon as possible and provide an update on the status of my claim. I'm confident that we can resolve this amicably and efficiently."                                                                                                                                                                                                                                                 |

## Citation

If you find our work interesting, please cite our paper.

```bibtex
@article{jo2024proxyllm,
  title={ProxyLLM: LLM-Driven Framework for Customer Support Through Text-Style Transfer},
  author={Jo, Sehyeong and Seo, Jungwon},
  journal={arXiv preprint arXiv:2412.09916},
  year={2024}
}
```
