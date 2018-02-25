import { Language, Edition } from '../src/db_models';

async function createLanguage() {
  await Language.add({
    abbreviation: 'en',
    description: '英文'
  });
  await Language.add({
    abbreviation: 'tw',
    description: '繁中'
  });
  await Language.add({
    abbreviation: 'jp',
    description: '日文'
  });
}

async function createEdition() {
  await Edition.add({
    language_id: 1,
    abbreviation: 'ed1',
    name: 'enEdition1',
  });

  await Edition.add({
    language_id: 2,
    abbreviation: 'ed1',
    name: 'twEdition1',
  });
  await Edition.add({
    language_id: 3,
    abbreviation: 'ed1',
    name: 'jpEdition1',
  });


  await Edition.add({
    language_id: 2,
    abbreviation: 'ed2',
    name: 'twEdition2',
  });

  const [err, edition ] =
  await Edition.add({
    language_id: 3,
    abbreviation: 'ed2',
    name: 'jpEdition2',
  });
}

export { createLanguage, createEdition };
