import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import prisma from "../../utils/prisma";

import { r2 } from "../../lib/cloudflare";
import { env } from "../../utils/env";

import { CreateBookInput, UploadBookInput } from "./book.schema";

// Generate signed URLs for the book file and cover image
export async function createSignedUrls(input: UploadBookInput) {
  const { userId, name } = input;
  const bookBucketKey = `${userId}/books/${name}-${randomUUID()}.epub`;
  
  // TODO: verify userId

  const bookSignedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: bookBucketKey,
      ContentType: "application/epub+zip",
    }),
    { expiresIn: 300 }
  );

  const coverBucketKey = `${userId}/covers/${name}-${randomUUID()}.png`;

  const coverSignedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: coverBucketKey,
      ContentType: "image/png",
    }),
    { expiresIn: 300 }
  );

  return {
    bookSignedUrl,
    bookBucketKey,
    coverSignedUrl,
    coverBucketKey,
  };
}

export async function createBook(input: CreateBookInput) {
  const { name: filename, id: clientId, ...rest } = input;
  const book = await prisma.book.create({
    data: {
      ...rest,
      clientId,
      filename,
    }
  });

  return book;
}

export async function getBooks(input: { userId: string }) {
  const { userId } = input;
  const books = await prisma.book.findMany({
    where: {
      userId
    }
  });

  return books;
}

export async function getBook(input: { id: string }) {
  const { id } = input;
  const book = await prisma.book.findUnique({
    where: {
      id
    }
  });

  return book;
}

export async function updateBookProgress(input: { id: string, percentageRead: number, lastLocation: string }) {
  const { id, ...rest } = input;
  const book = await prisma.book.update({
    where: {
      id
    },
    data: {
      ...rest
    }
  });

  return book;
}