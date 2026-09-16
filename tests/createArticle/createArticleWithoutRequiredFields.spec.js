import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY
} from '../../src/ui/constants/articleErrorMessages';
import {
  generateNewArticleData
} from '../../src/common/testData/generateNewArticleData';

let homePage;
let createArticlePage;
const article = generateNewArticleData();

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
});

test('Create an article with empty title', async () => {
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text)
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    TITLE_CANNOT_BE_EMPTY
  );
});

test('Create an article with empty description', async () => {
  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY
  );
});

test('Create an article with empty text', async () => {
  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    BODY_CANNOT_BE_EMPTY
  );
});
