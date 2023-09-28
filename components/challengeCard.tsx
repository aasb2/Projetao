import React, { useState, useEffect } from 'react';
import { getChallengesList } from '../services/functions/achievements/functionChallenges';

// Defina o tipo de objeto para os challenges
type Challenge = {
  id: string;
  challengeName: string;
  imageURL: string;
  completed: boolean;
  conditions: any[]; // Substitua 'any[]' pelo tipo correto das condições
};

export function ChallengeCard() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    // Função assíncrona para buscar a lista de challenges
    async function fetchChallenges() {
      try {
        const challengesData = await getChallengesList();
        setChallenges(challengesData);
      } catch (error) {
        console.error('Erro ao buscar a lista de challenges:', error);
      }
    }

    fetchChallenges();
  }, []);

  return (
    <div>
      <h2>Lista de Desafios</h2>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>{challenge.challengeName}</li>
        ))}
      </ul>
    </div>
  );
}
