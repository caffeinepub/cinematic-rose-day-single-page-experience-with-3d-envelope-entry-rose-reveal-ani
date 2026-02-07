import { useState, useCallback, useRef } from 'react';
import EnvelopeEntry from './components/EnvelopeEntry';
import RoseReveal from './components/RoseReveal';
import PetalField from './components/PetalField';
import TimedRomanticLines from './components/TimedRomanticLines';
import LipBitingReveal from './components/LipBitingReveal';
import FinalNote from './components/FinalNote';
import FooterSignature from './components/FooterSignature';

type Stage = 'envelope' | 'image1' | 'image2' | 'final';

function App() {
  const [stage, setStage] = useState<Stage>('envelope');
  const [showPetals, setShowPetals] = useState(false);
  
  // Use refs to ensure one-time progression guards
  const stageRef = useRef<Stage>('envelope');
  const hasTransitionedToImage1 = useRef(false);
  const hasTransitionedToImage2 = useRef(false);
  const hasTransitionedToFinal = useRef(false);
  
  stageRef.current = stage;

  const handleEnvelopeOpen = useCallback(() => {
    if (stageRef.current === 'envelope' && !hasTransitionedToImage1.current) {
      hasTransitionedToImage1.current = true;
      setStage('image1');
      setTimeout(() => setShowPetals(true), 800);
    }
  }, []);

  const handleImage1Complete = useCallback(() => {
    if (stageRef.current === 'image1' && !hasTransitionedToImage2.current) {
      hasTransitionedToImage2.current = true;
      setStage('image2');
    }
  }, []);

  const handleImage2Complete = useCallback(() => {
    if (stageRef.current === 'image2' && !hasTransitionedToFinal.current) {
      hasTransitionedToFinal.current = true;
      setStage('final');
    }
  }, []);

  return (
    <div className="app-container">
      {/* Petals layer - always rendered when active, floats above everything */}
      {showPetals && <PetalField />}

      {/* Main content flow */}
      <div className="content-flow">
        {stage === 'envelope' && <EnvelopeEntry onOpen={handleEnvelopeOpen} />}
        
        {/* Image 1 (dog with rose) + romantic text - visible from image1 stage onwards */}
        {(stage === 'image1' || stage === 'image2' || stage === 'final') && (
          <>
            <RoseReveal />
            <TimedRomanticLines onComplete={handleImage1Complete} />
          </>
        )}
        
        {/* Image 2 (lip-biting) with timed reveal - only during image2 stage */}
        {stage === 'image2' && (
          <LipBitingReveal onComplete={handleImage2Complete} mode="timed" />
        )}
        
        {/* Final note + lip-biting static + footer - visible in final stage */}
        {stage === 'final' && (
          <>
            <FinalNote />
            <LipBitingReveal onComplete={() => {}} mode="static" />
            <FooterSignature />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
