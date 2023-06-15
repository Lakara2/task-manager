import { useRouter } from "next/router";
import React from 'react';

interface HomeProps {
  serverTime: string;
}

const Home: React.FC<HomeProps> = ({ serverTime }) => {
  // Fonction pour calculer le temps écoulé en jours, heures, minutes et secondes
  const formatElapsedTime = (dateString: string) => {
    const currentTime = new Date();
    const serverTime = new Date(dateString);
    const elapsedTime = currentTime.getTime() - serverTime.getTime();

    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
  };
  
  // Fonction pour formater la date au format "DD-MM-AAAA HH:mm"
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString('fr-FR', options);
  };

  const formattedElapsedTime = formatElapsedTime(serverTime);
  const formattedServerTime = formatDate(serverTime);


  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  };
  
  const calculateTimeDifference = (serverTime: Date, clientTime: Date): string => {
    const timeDifference = Math.floor((clientTime.getTime() - serverTime.getTime()) / 1000);
  
    const days = Math.floor(timeDifference / (24 * 60 * 60));
    const hours = Math.floor((timeDifference % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeDifference % (60 * 60)) / 60);
    const seconds = Math.floor(timeDifference % 60);
  
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };
  

  return (
    <>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          <p>
            Server time:{" "}
            <span className="serverTime">
              {formattedServerTime}
            </span>
          </p>

          <p>
            Time diff:{" "}
            <span className="serverTime">{formattedElapsedTime}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const serverTime = new Date().toString(); // Récupère l'heure actuelle du serveur

  return {
    props: {
      serverTime,
    },
  };
}

export default Home;