import 'horizon/core';
import { Asset } from 'horizon/core';
import {
  UIComponent,
  View,
  Text,
  Pressable,
  Binding,
  Image,
  ImageSource,
  UINode,
} from 'horizon/ui';

class ImmersiveActivation extends UIComponent {
  // panel dimensions
  panelHeight = 400;
  panelWidth  = 600;

  initializeUI(): UINode {
    // 1) The question at the top
    const currentQuestion = new Binding<string>('Pick a theme to start!');

    // 2) Your three sets of 10 questions each
    const pg13Questions: string[] = [
      "What’s your most embarrassing moment?",
      "Who was your first crush?",
      "Have you ever lied to your parents?",
      "What’s the silliest thing you’ve done for a dare?",
      "What’s your favorite movie and why?",
      "Have you ever broken something and not told anyone?",
      "What’s your biggest fear?",
      "What’s a secret talent you have?",
      "Have you ever cheated on a test?",
      "What’s the weirdest food you’ve ever tried?"
    ];
    const casualQuestions: string[] = [
      "What’s your favorite hobby?",
      "If you could travel anywhere, where would you go?",
      "What’s your favorite book?",
      "Do you prefer cats or dogs?",
      "What’s your favorite season?",
      "What’s your go-to comfort food?",
      "What’s your favorite way to relax?",
      "If you could have any superpower, what would it be?",
      "What’s your favorite color?",
      "What’s your favorite thing to do on weekends?"
    ];
    const spicyQuestions: string[] = [
      "What’s the most daring thing you’ve ever done?",
      "Have you ever had a secret admirer?",
      "What’s your wildest dream?",
      "Have you ever had a crush on a teacher?",
      "What’s the most trouble you’ve gotten into?",
      "What’s your guilty pleasure?",
      "What’s the most spontaneous thing you’ve ever done?",
      "Have you ever sent a text to the wrong person?",
      "What’s the biggest lie you’ve ever told?",
      "What’s your most scandalous secret?"
    ];

    function randomPick(arr: string[]) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    // 3) Load your base panel image by its asset ID
    const panelAsset = new Asset(BigInt(4165252953760165));
    const panelBackground = Image({
      source: ImageSource.fromTextureAsset(panelAsset),
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: this.panelHeight,
        width: this.panelWidth,
      },
    });

    // 4) Build your UI stack
    return View({
      style: {
        width: this.panelWidth,
        height: this.panelHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 16,
      },
      children: [
        // **Background image** sits first, so everything else layers on top
        panelBackground,

        // **Question text**  
        Text({
          text: currentQuestion,
          style: {
            fontSize: 24,
            color: 'black',
            marginTop: 24,
            marginBottom: 32,
            textAlign: 'center',
          },
        }),

        // **Theme buttons**  
        View({
          style: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
          children: [
            Pressable({
              children: Text({ text: 'PG-13', style: { color: 'white', fontSize: 18 } }),
              onClick: () => currentQuestion.set(randomPick(pg13Questions)),
              style: { backgroundColor: '#4A90E2', padding: 12, borderRadius: 8 },
            }),
            Pressable({
              children: Text({ text: 'Casual', style: { color: 'white', fontSize: 18 } }),
              onClick: () => currentQuestion.set(randomPick(casualQuestions)),
              style: { backgroundColor: '#7ED321', padding: 12, borderRadius: 8 },
            }),
            Pressable({
              children: Text({ text: 'Spicy', style: { color: 'white', fontSize: 18 } }),
              onClick: () => currentQuestion.set(randomPick(spicyQuestions)),
              style: { backgroundColor: '#D0021B', padding: 12, borderRadius: 8 },
            }),
          ],
        }),
      ],
    });
  }
}

UIComponent.register(ImmersiveActivation, "immersiveactivation");
