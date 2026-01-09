import { createClient } from 'microcms-js-sdk';
import type { Blog, Service, MicroCMSListResponse } from '@/types';

// 環境変数のチェック
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || '';
const apiKey = process.env.MICROCMS_API_KEY || '';

// microCMSが設定されているかどうかをチェック
const isMicroCMSConfigured = serviceDomain !== '' && apiKey !== '';

// microCMSクライアントの初期化（設定されている場合のみ）
export const client = isMicroCMSConfigured
    ? createClient({
        serviceDomain,
        apiKey,
    })
    : null;

// 空のレスポンスを返すヘルパー
function emptyResponse<T>(): MicroCMSListResponse<T> {
    return {
        contents: [],
        totalCount: 0,
        offset: 0,
        limit: 0,
    };
}

/**
 * ブログ記事一覧を取得
 * @param limit 取得件数（デフォルト: 10）
 * @param offset オフセット（デフォルト: 0）
 */
export async function getBlogs(
    limit: number = 10,
    offset: number = 0
): Promise<MicroCMSListResponse<Blog>> {
    if (!client) {
        console.warn('microCMS is not configured. Returning empty blogs.');
        return emptyResponse<Blog>();
    }

    try {
        return await client.get({
            endpoint: 'blogs',
            queries: { limit, offset },
        });
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        return emptyResponse<Blog>();
    }
}

/**
 * ブログ記事詳細を取得（ID指定）
 * @param id コンテンツID
 */
export async function getBlogById(id: string): Promise<Blog | null> {
    if (!client) {
        console.warn('microCMS is not configured. Cannot fetch blog by ID.');
        return null;
    }

    try {
        return await client.get({
            endpoint: 'blogs',
            contentId: id,
        });
    } catch (error) {
        console.error('Failed to fetch blog by ID:', error);
        return null;
    }
}

/**
 * 全ブログ記事のIDを取得（SSG用）
 */
export async function getAllBlogIds(): Promise<{ id: string }[]> {
    if (!client) {
        console.warn('microCMS is not configured. Returning empty blog IDs.');
        return [];
    }

    try {
        const data = await client.get<MicroCMSListResponse<Blog>>({
            endpoint: 'blogs',
            queries: { fields: 'id', limit: 100 },
        });
        return data.contents.map((blog) => ({ id: blog.id }));
    } catch (error) {
        console.error('Failed to fetch blog IDs:', error);
        return [];
    }
}

/**
 * サービス一覧を取得
 * @param limit 取得件数（デフォルト: 10）
 * @param offset オフセット（デフォルト: 0）
 */
export async function getServices(
    limit: number = 10,
    offset: number = 0
): Promise<MicroCMSListResponse<Service>> {
    if (!client) {
        console.warn('microCMS is not configured. Returning empty services.');
        return emptyResponse<Service>();
    }

    try {
        return await client.get({
            endpoint: 'services',
            queries: { limit, offset },
        });
    } catch (error) {
        console.error('Failed to fetch services:', error);
        return emptyResponse<Service>();
    }
}

/**
 * サービス詳細を取得（slug指定）
 * @param slug カスタムURL用スラッグ
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
    if (!client) {
        console.warn('microCMS is not configured. Cannot fetch service by slug.');
        return null;
    }

    try {
        const data = await client.get<MicroCMSListResponse<Service>>({
            endpoint: 'services',
            queries: { filters: `slug[equals]${slug}`, limit: 1 },
        });
        return data.contents[0] || null;
    } catch (error) {
        console.error('Failed to fetch service by slug:', error);
        return null;
    }
}

/**
 * 全サービスのslugを取得（SSG用）
 */
export async function getAllServiceSlugs(): Promise<{ slug: string }[]> {
    if (!client) {
        console.warn('microCMS is not configured. Returning empty service slugs.');
        return [];
    }

    try {
        const data = await client.get<MicroCMSListResponse<Service>>({
            endpoint: 'services',
            queries: { fields: 'slug', limit: 100 },
        });
        return data.contents.map((service) => ({ slug: service.slug }));
    } catch (error) {
        console.error('Failed to fetch service slugs:', error);
        return [];
    }
}
