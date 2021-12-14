import Head from 'next/head';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { ProgressBar } from '../components/ProgressBar';

export default function Components() {
  // TODO: This file to be removed, for internal dev use only
  return (
    <>
      <Head>
        <title>Components</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <main className="container mx-auto px-6 py-6 antialiased space-y-10">
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <SectionButtons />
        <SectionTextField />
        <SectionProgressBar />
      </main>
      <footer></footer>
    </>
  );
}

function SectionButtons() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Button</h2>
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

      <div>
        <Button block>Block</Button>
      </div>
    </section>
  );
}

function SectionTextField() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">TextField</h2>
      <TextField label="Label" />
      <TextField label="Label" placeholder="Placeholder" />
      <TextField label="Label" error="Something went wrong" />
    </section>
  );
}

function SectionProgressBar() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">ProgressBar</h2>
      <ProgressBar value={100} />
    </section>
  );
}
