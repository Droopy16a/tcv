import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }

    // Explicitly format the key string before passing it
    const formattedPrivateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    // FIX: Match the exact property names from your TypeScript JWT definition
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'Feuille 1!A:C', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email, message]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erreur API Google Sheets:', error);
    return NextResponse.json(
      { error: 'Une erreur interne est survenue.', details: error.message },
      { status: 500 }
    );
  }
}