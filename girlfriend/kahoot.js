// ==UserScript==
// @name         Make Quiz
// @namespace    https://engage.annamaria.edu/
// @version      0.9
// @description  Girlfriend want quiz, girlfriend GET quiz
// @author       David (I'm dating you)
// @include      https://engage.annamaria.edu/learn/question/*
// @require https://code.jquery.com/jquery-2.1.4.min.js
// @run-at document-idle
// @grant unsafeWindow
// @grant GM_setValue
// @grant GM_getValue

// ==/UserScript==


// ins = document.querySelectorAll('[data-functional-selector=question-answer__input]').forEach(x => {
//   x.focus()
// x.blur()
// x.click()
// })


// (function() {
//     'use strict';

//     console.log('Tampering Monkey Detected!');

    class Question {
        constructor(text) {
            console.log('text: ', text);
            const elements = text.split(/[\n\r]+/, 6)
                                 .map((x, i) => {
                                    console.log('x: ', x);
                                    if (x && x.length) {
                                        return x.replace(/\w{1,2}\.\s/, '');
                                    }
                                });

            this.prompt = elements[0];
            // this.name = this.prompt.split(' ')
            //     .slice(0, 3)
            //     .join(' ')
            //     .concat(`... ${Date.now()}`);
            this.answers = elements.slice(1).map(x => new Answer(x));
            // console.log('elements: ', elements);
        }
    }

    class Answer {
        constructor(text) {
            this.correct = text[0] === '*';
            this.value = text.replace(/^\*/, '');
        }
    }

    function addMultipleChoiceQuestion(text) {
        const question = new Question(text),
              blanks = [...document.querySelectorAll('.ql-editor.ql-blank p')],
              promptField = blanks[0],
              answerFields = blanks.slice(1);

        console.log('blanks: ', blanks);
        console.log('promptField: ', promptField);
        console.log('answerFields: ', answerFields);

        // nameField.value = question.name;
        promptField.textContent = question.prompt;
        answerFields.forEach((x, i) => {
            const ans = question.answers[i];
            x.textContent = ans.value;
            if (ans && ans.correct) {
                console.log('ans ', i , ' is correct! ', ans.value);
                // const checkCorrect = document.querySelector(`#${i}`);
                // checkCorrect.click();



                // const checkLoop = window.setInterval(function() {
                //     console.log('checking x: ', x);
                //     x.click();
                // }, 2000)

                // function checkCorrect() {

                // }
                window.setTimeout(function() {
                    const checkCorrect = document.querySelectorAll('button[role=switch]')[i];
                    console.log('checkCorrect: ', checkCorrect);
                    checkCorrect.click();
                }, 1000);
            }
            console.log('question.answers[i]: ', question.answers[i]);
        });
    }

    const text = `The belief that knowledge is best acquired as a direct result of experience is called ________.
a. dualism
b. interactionism
*c. empiricism
d. functionalism

Which cliché most fully encompasses the beliefs of early Gestalt psychologists?
a. Reality is what you think, not what you see.
b. Be all that you can be.
c. If at first you don't succeed, try again!
*d. The whole is more than the sum of its parts.

Gestalt psychology, with its emphasis on topics such as learning and perception, was an important early precursor to the rise of ________ psychology in America.
a. behavioral
b. humanistic
c. psychodynamic
*d. cognitive

Why is it beneficial for scientists to use systematic observation in order to acquire knowledge?
*a. Observations provide the basic data that allow scientists to track, tally, or otherwise organize information about the natural world.
b. A systematic approach allows people to logically discuss philosophical questions in debate.
c. Observations provide everyone the chance to engage in science and form impressions.
d. A systematic approach allows theories to converge to produce singular, coherent hypotheses.

Which of the following is an example of an empirical question that could be tested using systematic observation?
a. Are humans inherently good or bad?
*b. Do native English-speaking Canadians take longer to learn Chinese or to learn Spanish?
c. What is the meaning of life?
d. Is Japanese a prettier language than German?

While a _______ is a group of closely related phenomena or observations, _______ is a logical idea that can be tested.
a. hypothesis; theory
b. method; belief
*c. theory; hypothesis
d. belief; method

What is one reason why scientific psychologists follow a specific set of guidelines to help them make decisions when doing research?
a. To certify researcher’s professional credentials as a researcher in the field of psychology.
b. To ensure that the topics of study are objective and in no way relate to researcher’s own values.
c. To help researchers publish research findings that are of interest to the public.
*d. To ensure they protect research participants from potential harm.

Informed consent to serve as a subject in research requires signing a document that states:
a. the purpose of the study
b. that the subject may end participation at any time
c. the probable risks involved
*d. all of the above

One of the ethical guidelines researchers abide by is ensuring __________, or agreeing that an individual’s data should not be made public without consent from the individual.
a. Informed consent
b. Privacy
c. Anonymity
*d. Confidentiality

Which ethical guideline would a scientist be breaking if they videotaped children, without asking their guardians, while the children were taking a test in class?
*a. privacy
b. confidentiality
c. observation
d. deception

Operational definitions are encouraged in research in order to:
a. make sure the research is publishable
b. increase the probability that experiments will succeed
*c. make terms used in a study as explicit as possible
d. make psychological research more easily understood by laypersons

Using an experimental research design, researchers manipulate the ________ variable and measure the ________ variable.
a. dependent, independent
b. dependent, correlational
*c. independent, dependent
d. independent, correlational

In order for researchers to be able to say that Variable A causes Variable B, they must eliminate the possible influence of ________.
a. correlational variables
b. independent variables
c. dependent variables
*d. confounding variables

When a researcher accidentally influences how participants behave, this effect is referred to as:
*a. experimenter expectations
b. placebo effect
c. random assignment
d. participant demand

In order to determine causal effects between variables researchers use:
a. correlation studies
b. case studies
*c. true experiments
d. naturalistic observation

Researchers manipulate or control variables in order to conduct:
a. naturalistic observation. 
b. the double-blind procedure. 
c. case studies. 
*d. a true experiment.

Among the examples below, the strongest correlation coefficient is:
a. +0.30
b. +0.05
c. +2.52
*d. -0.90

What would be the best method for examining the relationship between age and driving behavior?
a. case study
b. naturalistic observation
*c. correlational method
d. experimental method

Episodic memory is the memory system that holds what kind of information?
*a. autobiographical knowledge
b. generalized knowledge
c. knowledge required for reading
d. knowledge necessary for abstract problem solving

Andre grew up in New Orleans and was present when Hurricane Katrina occurred. His family, his community, and Andre share a ________ memory of this event.
a. working
b. short-term
*c. collective
d. semantic

Which principle describes when an unusual event, typically in the context of similar events, will be recalled and recognized better than uniform events?
a. cue overload
b. recoding
c. misinformation
*d. distinctiveness

Which of the following best describes a flashbulb memory?
a. A person will have worse memory for an unusual event than typical events
b. A person will have greater memory for a typical event than an unusual event 
*c. A person will have greater memory of some momentous and emotional event
d. A person will have worse memory of some momentous and emotional event

_______ is a process that occurs after encoding that is believed to stabilize memory traces.
*a. Consolidation
b. Inferences
c. Recoding
d. Retrieval

Our experiences that directly impact our brain though neural processes are referred to as:
a. cue overload
*b. memory traces/engrams
c. retrieval cues
d. mnemonic devices

If old experiences disrupt recall of new experiences, this is referred to as:
*a. proactive interference.
b. retrieval failure.
c. retroactive interference.
d. encoding failure.

Which of the following best captures how memory works?
a. Our memories are like recordings: in storage until we need to play them
b. We remember stressful events vividly and accurately
*c. Memories are reconstructions, which makes them susceptible to inaccuracy
d. Once we store something in long term memory, we can never forget it

Which of the following accurately reflects the influence of group discussion on recall accuracy?
a. When groups discuss an event, it improves individual recall accuracy.
*b. When groups discuss an event, it reduces individual recall accuracy.
c. When groups discuss an event, it has no effect on individual recall accuracy.
d. When groups discuss an event, it only improves recall accuracy if the discussion is moderated by an expert.

According to eyewitness testimony research, which of the following increases the likelihood of identification errors?
a. when perpetrators wear dark and loose clothing
b. when perpetrators are of average height and weight
*c. when eye-witnesses are asked to identify a perpetrator from a race other than their own
d. when eye-witnesses are asked to give their statement verbally instead of in writing

A(n) _________ memory is a memory of an event that never actually occurred. It is implanted by experimental manipulation or other means.
*a. false
b. iconic
c. eidetic
d. repressed

The failure to retrieve a word from memory, combined with partial recall and the feeling that retrieval is imminent is known by psychologists as the _____________ effect.
*a. tip-of-the-tongue
b. memory- failure
c. partially-activated-schemata
d. recurring-thwarted-efforts

A(n) __________ is a memory template that is formed through repeated exposure to a particular class of objects or events.
*a. schema
b. script
c. heuristic
d. bias

“________ ground” refers to the information that is shared by people in a conversation. It allows for communication between speaker and listener to make coherent sense to both parties.
a.  Borrowed
b. Associative
*c. Common
d. Blended

Cedric tells a new acquaintance that is “from Chicago” but when he learns that this man is also a Chicago native he corrects by listing the specific neighborhood in which he lives.   This is called:
a. syntax
b. social network
*c. audience design
d. priming 

Gossip, making up 60-70% of conversations, is argued to be an important part of defining _____________ and _____________ in regulating the social world.
*a. ingroups and outgroups
b. social networks and friendships
c. friendships and ingroups
d. stereotypes and outgroups 

The ___________hypothesis suggests that humans have developed larger brains in order to better maintain large in-groups.
a. social development
b. social categorization
c. psychosocial biology
*d. social brain

According to the Sapir-Whorf hypothesis, pronouns like “I”, “me”, and “my” are used more often in ________ cultures. 
a. collectivist
*b. individualistic
c. youth
d. indigenous 

______ are systematic and predictable mistakes that influence judgment and decision making.
a. Rationalities
*b. Biases
c. Intelligences
d. Exactitudes

When it comes to making rational decisions humans tend to rely heavily on _________.
a. systematic thinking
*b. intuition
c. what others think
d. all of these

The tendency to inflate your own sense of competence or to be more certain than you should be is called __________.
a. intuition
*b. overconfidence
c. a type II error
d. anchoring

System 2 thinking is driven by _____________ and is typically ______________. 
a. intuition; fast
b. intuition; slow
c. conscious thinking; fast
*d. conscious thinking; slow

Which of the following pairs of psychologists were responsible for the first recognized test of intelligence quotient, or IQ?
a. Spearman and Galton
b. Thurstone and Gladman
c. Wechsler and Terman
*d. Binet and Simon

Some researcher say that ____________________ is really a set of skills including stress management and the ability to perceive moods.
a. interpersonal intelligence 
*b. emotional Intelligence
c. street smarts
d. practical Intelligence

_______ is the idea that an assessment measures what it is supposed to measure and can predict future performance or behaviors.
a. Reliability
b. Explanatory capacity
*c. Validity
d. Standardization

In classical conditioning, the response is ________ by a stimulus that comes ________it.
a. blocked; before
b. blocked; after
*c. elicited; before
d. elicited; after

In Pavlov’s experiments, what type of stimulus was the bell, generally?
a. discriminative.
*b. conditioned.
c. unconditioned.
d. neutral.

In classical conditioning the unconditioned response is:
a. the response triggered by the conditioning
*b. the biological response triggered by the unconditioned stimulus
c. the response triggered by the conditioned stimulus
d. the response given by the subject outside of the stimulus

Humans are much more likely to associate snakes with danger than flowers and danger. This is due to our evolutionary tendency called __________.
a. adaptation
b. organism biology
*c. preparedness
d. neuro-conditioning

What phenomenon describes the possibility of an extinguished response being activated again in a new context? 
*a. renewal effect
b. extinction
c. context cues
d. recovery

In which of these scenarios has extinction occurred?
a. Connor finds that he needs to smoke more cigarettes to get the same nicotine buzz as he used to.
b. Connor finds that smoking cigarettes is no longer as rewarding as when he first started.
*c. Connor has quit smoking and no longer feels excited when he sees a cigarette.
d. Connor has quit smoking, but still craves the nicotine buzz that he used to get in the past.

Effects that increase behaviors are __________; effects that decrease them are ____________.
*a. reinforcers; punishers
b. rewards; consequences
c. positive; negative
d. right; wrong

If Jack confiscates his son Joshua’s video game console to stop him from misbehaving, what technique is Jack using to modify Joshua’s behavior?
a. negative reinforcement.
b. positive reinforcement.
*c. negative punishment.
d. passive aggressive behavior.

Social Learning Theory requires ___________ in order for learning to take place.
*a. social models
b. reinforcements
c. a complex game
d. a set of rules

In a follow-up study to the original Bobo Doll experiment, Badura observed the process of vicarious reinforcement, where children behaved less aggressively when: 
*a. aggressive models were punished
b. aggressive models were rewarded
c. non aggressive models were punished
d. non aggressive models were rewarded

What kind of research is traditionally considered to be the “gold standard” in psychology research?
a. the correlational study
b. the survey method
c. the longitudinal design
*d. the laboratory experiment

The ability to arrive at broad conclusions based on smaller ones is known as __________. It requires that the sample under investigation be representative of the larger population from which it was drawn.
*a. generalizability
b. validity
c. reliability
d. standardization

The degree to which a study allows unambiguous causal inferences has ________.
a. external validity
b. ecological validity
*c. internal validity
d. publishing potential

The degree to which a study ensures that potential findings apply to settings and samples other than the ones being studied refers to:
a. internal validity
*b. external validity
c. ecological validity
d. publishing potential

The degree to which a study finding has been obtained under conditions that are typical for what happens in everyday life is called ___________.
a. generalizability
b. interrater reliability
c. face validity
*d. ecological validity

When a study uses the __________ method of data collection, participants complete a questionnaire about their thoughts, feelings, and behavior at the end of each day.
*a. diary
b. experience sampling
c. case study
d. journaling

The __________ method is a research approach in which participants describe their experiences and behavior of a given day through systematic recollection on the following day
a. circadian rebuilding
b. experience sampling
c. diary
*d. day reconstruction



`;

    arr = text.split(/\n(\*?d\.[^\n]*)\n*/)
              .map((x, i, a)=> {
                if (i % 2 === 0) {
                    return x.concat('\n', a[i + 1]);
                }
                return x;
    }).filter((x, i) => i % 2 === 0);

    // addMultipleChoiceQuestion(text);


    // const babeHeader = document.createElement('header');
    // const questionRawText = document.createElement('textarea');
    // const updateButton = document.createElement('button');

    // const mainForm = document.querySelector('#mform1');
    // const mainContainer = document.querySelector('[role=main]');



    // mainContainer.insertBefore(babeHeader, mainForm);
    // mainContainer.insertBefore(questionRawText, mainForm);
    // mainContainer.insertBefore(updateButton, mainForm);

    // babeHeader.textContent = 'No babe. Just tell me the question, okay?';
    // questionRawText.style.width = '80%';
    // questionRawText.style.height = '200px';

    // updateButton.style.width = '100px';
    // updateButton.style.height = '30px';
    // updateButton.style.display = 'block';
    // updateButton.textContent = 'Do it';

    // updateButton.addEventListener('click', function() {
    //     addMultipleChoiceQuestion(questionRawText.value);
    //     updateButton.textContent = 'I love you';
    // });



// })();