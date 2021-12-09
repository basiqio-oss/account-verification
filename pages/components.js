import Head from 'next/head';
import { Button } from '../components/Button';

export default function Components() {
  // TODO: This file to be removed, for internal dev use only
  return (
    <>
      <Head>
        <title>Basiq account verification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto px-3 py-3">
        <h1 className="text-4xl mb-5">Components</h1>
        <SectionButtons />
      </main>
      <footer></footer>
    </>
  );
}

function SectionButtons() {
  return (
    <section>
      <div className="space-x-4">
        <Button>Default</Button>
        <Button variant="bold">Bold</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="inverted">Inverted</Button>
        <Button variant="critical">Critical</Button>
      </div>

      <div className="space-x-4">
        <Button loading>Default</Button>
        <Button loading variant="bold">
          Bold
        </Button>
        <Button loading variant="subtle">
          Subtle
        </Button>
        <Button loading variant="inverted">
          Inverted
        </Button>
        <Button loading variant="critical">
          Critical
        </Button>
      </div>

      <div className="space-x-4">
        <Button disabled>Default</Button>
        <Button disabled variant="bold">
          Bold
        </Button>
        <Button disabled variant="subtle">
          Subtle
        </Button>
        <Button disabled variant="inverted">
          Inverted
        </Button>
        <Button disabled variant="critical">
          Critical
        </Button>
      </div>
    </section>
  );
}
