import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading', {level: 1});
    this.articleEditButton = page.getByRole('link', { name: 'Edit Article' }).first();
    this.profile = page.getByRole('link', { name: 'your profile image' });
  }

  async articleEditClick() {
    await test.step(`Article Edit button click`, async () => {
      await this.articleEditButton.click();
    })
  }

  
  async assertArticleHasCorrectTitle(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleHasUpdatedTitle(title) {
    await test.step('Assert the article has updated title', async () => {
      await this.page.waitForURL(/\/article\//);
      await this.page.reload();
      await expect(this.articleTitleHeader).toHaveText(title);
    });
  }

  async assertArticleHasUpdatedText(text) {
    await test.step(`Assert the article has updated description`, async () => {
      await this.page.waitForURL(/\/article\//);
      await this.page.reload();
      await expect(this.page.getByText(text)).toHaveText(text);
    });
  }


  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await this.page.waitForURL(/\/article\//);
      await this.page.reload();
      await expect(this.page.getByText(text)).toHaveText(text);
    });
  }

  async assertArticleHasTags(tags) {
    await test.step(`Assert the article has correct tags`, async () => {
      await this.page.waitForURL(/\/article\//);
      await this.page.reload();
      for (const tag of tags) {
        await expect(this.page.getByText(tag, { exact: true })).toBeVisible();
      }
    });
  }

  async assertTagIsNotVisible(tag) {
    await test.step(`Assert the '${tag}' tag is not visible`, async () => {
      await this.page.waitForURL(/\/article\//);
      await this.page.reload();
      await expect(this.page.locator('.tag-pill').filter({ hasText: tag }))
      .toHaveCount(0);
    })
  }
}
